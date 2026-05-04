const values = [
  {
    title: "Equipo local",
    text: "Conocemos cada ruta y cuidamos cada entrega con detalle.",
  },
  {
    title: "Calidad premium",
    text: "Flota revisada, limpieza profesional y equipamiento completo.",
  },
  {
    title: "Libertad total",
    text: "Viaja a tu ritmo con soporte continuo y planes flexibles.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Sobre nosotros
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Somos el equipo que hace tu ruta mas sencilla
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            VanLife Rentals nace en la costa mediterranea con una idea clara:
            convertir cada viaje en una experiencia fluida. Combinamos
            tecnologia, atencion personalizada y una flota cuidada para que solo
            pienses en disfrutar.
          </p>
          <p className="text-sm leading-6 text-slate-300">
            Trabajamos con un equipo local de especialistas en rutas,
            mantenimiento y soporte. Asi garantizamos entregas puntuales y
            asistencia en cada destino.
          </p>
        </div>
        <div className="glass-panel rounded-3xl p-6">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Datos clave
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Furgonetas activas</span>
                <span className="text-white">120+</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Destinos cubiertos</span>
                <span className="text-white">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Equipo de soporte</span>
                <span className="text-white">24/7</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Reservas mensuales</span>
                <span className="text-white">900+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {values.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
