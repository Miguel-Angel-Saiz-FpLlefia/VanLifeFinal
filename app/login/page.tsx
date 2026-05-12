"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Acceso
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Bienvenido</h1>
        <p className="mt-2 text-sm text-slate-300">
          Accede para gestionar tus reservas y rutas favoritas.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm text-slate-200">
          {error && <div className="text-red-400 bg-red-950/40 p-3 rounded-lg">{error}</div>}
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
              placeholder="********"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full rounded-full bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-teal-200">
            Crea una ahora
          </Link>
        </p>
      </div>
    </div>
  );
}
