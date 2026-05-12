"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  camperId: string;
  pricePerDay: number;
}

export default function BookingForm({ camperId, pricePerDay }: BookingFormProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * pricePerDay;
  };

  const total = calculateTotal();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ camperId, startDate, endDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al realizar la reserva");

      setMessage({ type: "success", text: "¡Reserva realizada con éxito! Redirigiendo..." });
      setTimeout(() => {
        router.push("/my-bookings");
      }, 2000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Reserva esta camper</p>
      <p className="mt-3 text-3xl font-semibold text-white">{pricePerDay} EUR <span className="text-sm font-normal text-slate-400">/ día</span></p>

      <form onSubmit={handleBooking} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Fecha de inicio</label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Fecha de fin</label>
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
          />
        </div>

        {total > 0 && (
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-sm text-slate-400">Total estimado</span>
            <span className="text-xl font-bold text-teal-200">{total} EUR</span>
          </div>
        )}

        {message && (
          <div className={`p-3 rounded-xl text-xs ${message.type === "success" ? "bg-teal-950/50 text-teal-400" : "bg-red-950/50 text-red-400"}`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !startDate || !endDate}
          className="w-full rounded-full bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Confirmar Reserva"}
        </button>
      </form>
      
      <p className="mt-4 text-center text-xs text-slate-500 italic">No se te cobrará nada todavía</p>
    </div>
  );
}
