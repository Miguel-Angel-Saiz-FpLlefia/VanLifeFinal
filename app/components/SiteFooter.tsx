import Link from "next/link";

const footerLinks = [
  { label: "Catalogo", href: "/catalog" },
  { label: "Sobre nosotros", href: "/about" },
  { label: "Contacto", href: "/contact" },
  { label: "Login", href: "/login" },
  { label: "Registro", href: "/register" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            VanLife Rentals
          </p>
          <p className="text-lg font-semibold text-white">
            Confianza, seguridad y libertad para cada ruta.
          </p>
          <p className="text-sm text-slate-400">
            Flota revisada, asistencia 24/7 y reservas simples desde cualquier
            dispositivo.
          </p>
        </div>
        <div className="space-y-2 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Navegacion
          </p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-teal-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Contacto directo
          </p>
          <p>+34 600 123 456</p>
          <p>hola@vanlife.local</p>
          <p>Carrer del Mar 24, Barcelona</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        (c) 2026 VanLife Rentals. Todos los derechos reservados.
      </div>
    </footer>
  );
}
