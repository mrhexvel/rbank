import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// JWT secret (в реальном приложении это было бы переменной окружения)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    // Получаем токен из cookies
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    // Проверяем токен
    try {
      const decoded = verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        name: string;
      };

      // Поскольку у нас нет реальной таблицы транзакций в этом примере,
      // мы создадим тестовые данные для демонстрации
      const transactions = [
        {
          id: "1",
          name: "Продуктовый магазин",
          amount: -5825,
          date: "Сегодня, 10:30",
          category: "Покупки",
          icon: "🛒",
        },
        {
          id: "2",
          name: "Зарплата",
          amount: 150000,
          date: "Вчера, 9:15",
          category: "Доход",
          icon: "💰",
        },
        {
          id: "3",
          name: "Счет за электричество",
          amount: -3245,
          date: "20 мая, 2024",
          category: "Коммунальные услуги",
          icon: "⚡",
        },
        {
          id: "4",
          name: "Ресторан",
          amount: -4580,
          date: "18 мая, 2024",
          category: "Еда",
          icon: "🍔",
        },
        {
          id: "5",
          name: "Онлайн перевод",
          amount: -15000,
          date: "15 мая, 2024",
          category: "Перевод",
          icon: "🔄",
        },
        {
          id: "6",
          name: "Стриминговый сервис",
          amount: -649,
          date: "12 мая, 2024",
          category: "Развлечения",
          icon: "🎬",
        },
        {
          id: "7",
          name: "Фриланс оплата",
          amount: 35000,
          date: "10 мая, 2024",
          category: "Доход",
          icon: "💻",
        },
        {
          id: "8",
          name: "АЗС",
          amount: -2530,
          date: "8 мая, 2024",
          category: "Транспорт",
          icon: "⛽",
        },
      ];

      // Возвращаем данные транзакций
      return NextResponse.json({ transactions });
    } catch (error) {
      return NextResponse.json(
        { message: "Недействительный токен" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Ошибка при получении транзакций:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
