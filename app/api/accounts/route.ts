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

      // Получаем счета пользователя из базы данных
      const accounts = await prisma.account.findMany({
        where: { userId: decoded.id },
        orderBy: { balance: "desc" },
      });

      // Возвращаем данные счетов
      return NextResponse.json({ accounts });
    } catch (error) {
      return NextResponse.json(
        { message: "Недействительный токен" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Ошибка при получении счетов:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
