import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">404</p>
      <h1 className="text-4xl font-semibold text-white">Esta ruta no existe</h1>
      <p className="text-sm text-slate-300">
        Vuelve al catalogo para encontrar la camper perfecta.
      </p>
      <Link
        href="/catalog"
        className="rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950"
      >
        Volver al catalogo
      </Link>
    </div>
  );
}
