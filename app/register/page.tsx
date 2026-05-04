import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Registro
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Crea tu cuenta
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Accede a ofertas, rutas sugeridas y seguimiento de reservas.
        </p>
        <form className="mt-6 space-y-4 text-sm text-slate-200">
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Nombre completo
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Email
            </label>
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Contrasena
            </label>
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
              placeholder="********"
            />
          </div>
          <button className="w-full rounded-full bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950">
            Crear cuenta
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Ya tienes cuenta?{" "}
          <Link href="/login" className="text-teal-200">
            Inicia sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
