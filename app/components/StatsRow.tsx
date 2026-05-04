const stats = [
  { label: "Furgonetas equipadas", value: "120+" },
  { label: "Recogida sin espera", value: "15 min" },
  { label: "Asistencia", value: "24/7" },
  { label: "Reserva en 3 pasos", value: "Rapido" },
];

export default function StatsRow() {
  return (
    <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card-lift rounded-2xl border border-white/10 bg-slate-950/50 p-4"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-300" />
            <p className="text-lg font-semibold text-white">{stat.value}</p>
          </div>
          <p className="mt-2 text-slate-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
