import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black/30 border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  Н
                </span>
                <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"></div>
              </div>
              <span className="font-bold text-xl">РБанк</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Переосмысление банкинга для цифровой эпохи с передовыми
              технологиями и клиентоориентированными услугами.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Продукты</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Расчетные счета
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Сберегательные счета
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Кредитные карты
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Кредиты
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Инвестиции
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Компания</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Карьера
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Пресса
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Подписка</h3>
            <p className="text-muted-foreground mb-4">
              Подпишитесь на нашу рассылку, чтобы получать обновления о наших
              последних предложениях!
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Email адрес" className="bg-black/50" />
              <Button className="bg-primary hover:bg-primary/90">
                Подписаться
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 РБанк. Все права защищены.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Условия использования
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Политика cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
