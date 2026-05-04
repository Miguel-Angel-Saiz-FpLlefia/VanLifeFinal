export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Contacto
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Hablemos de tu siguiente ruta
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            Nuestro equipo responde en menos de 24 horas. Comparte tus fechas,
            destino y el tipo de experiencia que buscas.
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Oficina central
            </p>
            <p className="mt-3">Carrer del Mar 24, Barcelona</p>
            <p>+34 600 123 456</p>
            <p>hola@vanlife.local</p>
          </div>
        </div>
        <form className="glass-panel space-y-4 rounded-3xl p-6 text-sm text-slate-200">
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
              Mensaje
            </label>
            <textarea
              rows={5}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
              placeholder="Cuanta tu plan ideal"
            />
          </div>
          <button className="w-full rounded-full bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950">
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
