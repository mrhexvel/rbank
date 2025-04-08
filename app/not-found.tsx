import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Страница не найдена</p>
      <p className="text-lg mb-12">
        Простите, возможно данная страница ещё в разработке.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-light transition-colors"
      >
        В главную
      </Link>
    </div>
  );
}
