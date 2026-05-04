import Link from "next/link";
import prisma from "../lib/prisma";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const campers = await prisma.camper.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Catalogo
        </p>
        <h1 className="text-4xl font-semibold text-white">
          Elige la camper que encaje con tu ruta
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Todas las furgonetas incluyen equipamiento completo, limpieza premium
          y soporte 24/7. Filtra por estilo, tamano y presupuesto.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {campers.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            No hay campers disponibles por ahora.
          </div>
        ) : (
          campers.map((camper) => (
            <Link
              key={camper.id}
              href={`/campers/${camper.id}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-teal-300/40"
            >
              <div
                className={`h-44 rounded-2xl bg-gradient-to-br ${camper.accent}`}
              />
              <div className="mt-4 space-y-2">
                <h2 className="text-lg font-semibold text-white">
                  {camper.name}
                </h2>
                <p className="text-sm text-slate-300">{camper.tagline}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                  <span>{camper.sleep} plazas</span>
                  <span>{camper.seats} asientos</span>
                  <span>{camper.transmission}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{camper.pricePerDay} EUR / dia</span>
                  <span className="text-teal-200">Ver detalles</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
