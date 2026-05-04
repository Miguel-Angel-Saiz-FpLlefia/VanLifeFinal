import Link from "next/link";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Catalogo", href: "/catalog" },
  { label: "Sobre nosotros", href: "/about" },
  { label: "Contacto", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-400/20 text-teal-200">
            <span className="text-lg font-semibold">V</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              VanLife
            </p>
            <p className="text-lg font-semibold text-white">Rentals</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-teal-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm text-slate-300 transition hover:text-white md:inline-flex"
          >
            Acceder
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-teal-400/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
          >
            Reserva ahora
          </Link>
        </div>
      </div>
    </header>
  );
}
