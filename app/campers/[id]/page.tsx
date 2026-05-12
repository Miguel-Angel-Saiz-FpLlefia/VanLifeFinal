import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../../lib/prisma";

type CamperDetailProps = {
  params: { id: string };
};

export const dynamic = "force-dynamic";

export default async function CamperDetailPage({ params }: CamperDetailProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.id;
  const id = rawId ? decodeURIComponent(rawId).trim() : "";
  if (!id) {
    notFound();
  }

  const camper = await prisma.camper.findUnique({
    where: { id },
  });

  if (!camper) {
    const ids = await prisma.camper.findMany({
      select: { id: true },
      orderBy: { id: "asc" },
    });
    const idList = ids as Array<{ id: string }>;

    return (
      <div className="mx-auto w-full max-w-4xl px-6 pb-20 pt-14 text-sm text-slate-300">
        <p className="text-lg font-semibold text-white">
          Camper no encontrada.
        </p>
        <p className="mt-2">
          IDs disponibles: {idList.map((item) => item.id).join(", ")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14">
      <Link href="/catalog" className="text-sm text-teal-200">
        Volver al catalogo
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="space-y-4">
            {camper.images && camper.images.length > 0 ? (
              <div className="grid gap-4">
                <div className="relative h-80 w-full overflow-hidden rounded-3xl">
                  <img
                    src={camper.images[0]}
                    alt={camper.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {camper.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {camper.images.slice(1).map((img, index) => (
                      <div key={index} className="relative h-32 overflow-hidden rounded-2xl">
                        <img
                          src={img}
                          alt={`${camper.name} ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`h-64 rounded-3xl bg-gradient-to-br ${camper.accent}`}
              />
            )}
          </div>
          <div className="mt-6 space-y-4">
            <h1 className="text-4xl font-semibold text-white">{camper.name}</h1>
            <p className="text-sm leading-6 text-slate-300">{camper.tagline}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span>{camper.sleep} plazas</span>
              <span>{camper.seats} asientos</span>
              <span>{camper.transmission}</span>
              <span>Salida: {camper.location}</span>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">
              Equipamiento incluido
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
              {camper.features.map((feature: string) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Precio base
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {camper.pricePerDay} EUR / dia
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Incluye seguro completo y asistencia 24/7.
            </p>
            <button className="mt-6 w-full rounded-full bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950">
              Reservar esta camper
            </button>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Valoracion
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-teal-200">***** {camper.rating}</span>
              <span>{camper.reviews} resenas</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
