"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  camper: { name: string };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(res => res.json())
      .then(data => {
        if (data.bookings) setBookings(data.bookings);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      if (res.ok) {
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div className="text-white">Cargando reservas...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Gestión de Reservas</h1>
      
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4">Usuario</th>
              <th className="px-6 py-4">Caravana</th>
              <th className="px-6 py-4">Fechas</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{booking.user.name || "Sin nombre"}</div>
                  <div className="text-xs text-slate-500">{booking.user.email}</div>
                </td>
                <td className="px-6 py-4 font-medium text-teal-200">{booking.camper.name}</td>
                <td className="px-6 py-4">
                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-bold text-white">{booking.totalPrice} €</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                    booking.status === 'CONFIRMED' ? 'bg-teal-400/20 text-teal-300' : 
                    booking.status === 'CANCELLED' ? 'bg-red-400/20 text-red-300' : 'bg-yellow-400/20 text-yellow-300'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  {booking.status === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                        className="text-teal-400 hover:text-teal-300 text-xs font-semibold"
                      >
                        Confirmar
                      </button>
                      <button 
                        onClick={() => updateStatus(booking.id, 'CANCELLED')}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {booking.status !== 'PENDING' && (
                     <span className="text-slate-600 text-xs italic">Completada</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="p-8 text-center text-slate-500 italic">No hay reservas registradas.</div>
        )}
      </div>
    </div>
  );
}
