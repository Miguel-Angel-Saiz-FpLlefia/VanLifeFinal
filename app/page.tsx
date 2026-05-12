import type { Camper } from "@prisma/client";
import Link from "next/link";
import SceneIllustration from "./components/SceneIllustration";
import StatsRow from "./components/StatsRow";
import prisma from "./lib/prisma";

const testimonials = [
  {
    name: "Jordi P.",
    role: "Aventura alpina",
    text: "Experiencia impecable, la camper estaba lista y el viaje fue perfecto.",
  },
  {
    name: "Laura M.",
    role: "Ruta por la costa",
    text: "Rapido, claro y con un equipo atento en cada detalle.",
  },
  {
    name: "Marc G.",
    role: "Escapada familiar",
    text: "Reserva sencilla y furgoneta en excelente estado.",
  },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const campers: Camper[] = await prisma.camper.findMany({
    take: 3,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="hero-shell bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(45,212,191,0.18),_transparent_35%),linear-gradient(180deg,_#0b1218_0%,_#0f1b25_55%,_#0b1218_100%)]">
      <div className="glow-orb -left-10 top-20 h-40 w-40 bg-teal-400/30" />
      <div className="glow-orb delayed right-10 top-10 h-56 w-56 bg-cyan-400/20" />
      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-20 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="fade-up text-xs uppercase tracking-[0.4em] text-slate-400">
              VanLife Rentals
            </p>
            <h1 className="fade-up delay-1 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Tu aventura empieza aqui con
              <span className="text-glow block bg-gradient-to-r from-teal-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                estilo, control y libertad total.
              </span>
            </h1>
            <p className="fade-up delay-2 text-base leading-7 text-slate-300 md:text-lg">
              Camper equipadas al detalle para rutas memorables. Reserva en
              minutos y recoge la furgoneta lista para salir.
            </p>
            <div className="fade-up delay-3 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                Descubre los modelos
              </Link>
              <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-200 hover:text-teal-100">
                Ver video
              </button>
            </div>
            <div className="fade-up delay-3 flex items-center gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-1">
                <span className="text-teal-300">*****</span>
                <span>4.8/5</span>
              </div>
              <span className="text-slate-500">|</span>
              <span>Basado en 430 resenas reales</span>
            </div>
          </div>
          <div className="glass-strong card-lift rounded-[32px] p-4">
            <SceneIllustration className="h-full w-full rounded-[24px]" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-10">
        <StatsRow />
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="card-lift space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Experiencia digital
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Viaja mas. Preocupate menos.
            </h2>
            <p className="text-sm leading-6 text-slate-300">
              Gestiona tu viaje desde cualquier dispositivo. Accede a rutas
              recomendadas, seguros flexibles y asistencia directa sin letras
              pequenas.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-200"
            >
              Reserva tu aventura
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>
          <div className="glass-panel card-lift rounded-3xl p-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Panel rapido
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Reserva instantanea
              </h3>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Fechas flexibles</span>
                  <span className="text-teal-200">Personaliza</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Ubicacion ideal</span>
                  <span className="text-teal-200">Selecciona</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Seguro premium</span>
                  <span className="text-teal-200">Incluido</span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300">
                Reservar ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Modelos destacados
            </p>
            <h2 className="text-3xl font-semibold text-white">Elige tu ruta</h2>
          </div>
          <Link href="/catalog" className="text-sm text-teal-200">
            Ver catalogo
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {campers.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
              Aun no hay campers disponibles.
            </div>
          ) : (
            campers.map((camper) => (
              <Link
                href={`/campers/${camper.id}`}
                key={camper.id}
                className="card-lift group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-teal-300/40"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                  {camper.images && camper.images.length > 0 ? (
                    <img
                      src={camper.images[0]}
                      alt={camper.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${camper.accent}`}
                    />
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {camper.name}
                  </h3>
                  <p className="text-sm text-slate-300">{camper.tagline}</p>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{camper.pricePerDay} EUR / dia</span>
                    <span className="text-teal-200">Ver detalles</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
          <div className="card-lift rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Opiniones reales
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Lo que dicen nuestros clientes
            </h2>
            <div className="mt-6 space-y-4">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <p className="text-sm text-slate-200">{item.text}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{item.name}</span>
                    <span>{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-strong card-lift rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Reserva rapida
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Reserva tu furgoneta
            </h2>
            <form className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Recogida
                </label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white"
                  placeholder="Selecciona fecha"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Retorno
                </label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white"
                  placeholder="Selecciona fecha"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Punto de salida
                </label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white"
                  placeholder="Barcelona, Girona, Valencia"
                />
              </div>
              <button className="w-full rounded-full bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300">
                Comprobar disponibilidad
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="glass-strong rounded-3xl px-6 py-8 text-center text-sm text-slate-300 md:text-left">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-lg font-semibold text-white">Pago seguro</p>
              <p>Pagos protegidos y sin comisiones ocultas.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                Cancelacion flexible
              </p>
              <p>Cambia de plan sin penalizaciones inesperadas.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                Asistencia local
              </p>
              <p>Equipo disponible en cada destino.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                Vehiculos revisados
              </p>
              <p>Inspeccion profesional antes de cada entrega.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
