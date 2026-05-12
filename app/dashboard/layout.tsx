import { ReactNode } from "react";
import Link from "next/link";
import { verifySession } from "@/app/lib/session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await verifySession();
  const isAdmin = session?.role === "ADMIN";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-300">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-8 tracking-wide">
          PANEL DE CONTROL
        </h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="text-slate-400 font-semibold hover:text-teal-300 transition-colors">
            Añadir Caravana
          </Link>
          <Link href="/dashboard/bookings" className="text-slate-400 font-semibold hover:text-teal-300 transition-colors">
            Gestionar Reservas
          </Link>
          {isAdmin && (
            <Link href="/dashboard/users" className="text-slate-400 font-semibold hover:text-teal-300 transition-colors">
              Gestionar Usuarios
            </Link>
          )}
          <Link href="/" className="text-slate-400 hover:text-white transition-colors mt-8">
            Volver a la Web
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
