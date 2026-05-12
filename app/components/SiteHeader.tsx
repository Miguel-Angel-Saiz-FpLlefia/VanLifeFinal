"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalog" },
  { label: "Sobre nosotros", href: "/about" },
  { label: "Contacto", href: "/contact" },
];

interface User {
  email: string;
  role: string;
}

export default function SiteHeader({ initialUser }: { initialUser?: User | null }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser || null);

  // Sincronizar estado si initialUser cambia (por ejemplo tras router.refresh())
  useEffect(() => {
    if (initialUser !== undefined) {
      setUser(initialUser);
    }
  }, [initialUser]);

  // Solo hacemos fetch si no tenemos initialUser (fallback)
  useEffect(() => {
    if (user === null && initialUser === undefined) {
      fetch("/api/auth/profile")
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) setUser(data.user);
        })
        .catch(() => setUser(null));
    }
  }, [initialUser, user]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

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
          {user?.role === "ADMIN" && (
            <Link href="/dashboard" className="text-teal-400 font-semibold transition hover:text-teal-300">
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-slate-400 md:inline">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Salir
              </button>
            </div>
          ) : (
            <>
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
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
