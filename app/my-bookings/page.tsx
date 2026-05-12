import Link from "next/link";
import { verifySession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MyBookingsPage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.userId },
    include: {
      camper: true
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-white">Mis Reservas</h1>
        <Link href="/catalog" className="text-sm text-teal-200">
          Explorar más caravanas
        </Link>
      </div>

      <div className="mt-10 space-y-6">
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-slate-400">Aún no tienes ninguna reserva.</p>
            <Link href="/catalog" className="mt-4 inline-block rounded-full bg-teal-400 px-6 py-2 text-sm font-semibold text-slate-950">
              Empezar mi aventura
            </Link>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col md:flex-row gap-6 p-6">
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                {booking.camper.images?.[0] ? (
                  <img src={booking.camper.images[0]} alt={booking.camper.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${booking.camper.accent}`} />
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{booking.camper.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      booking.status === 'CONFIRMED' ? 'bg-teal-400/20 text-teal-300' : 
                      booking.status === 'CANCELLED' ? 'bg-red-400/20 text-red-300' : 'bg-yellow-400/20 text-yellow-300'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{booking.camper.location}</p>
                  <div className="mt-4 flex gap-8 text-sm">
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-widest">Desde</p>
                      <p className="text-white font-medium">{booking.startDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-widest">Hasta</p>
                      <p className="text-white font-medium">{booking.endDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col justify-end">
                <p className="text-slate-500 text-xs uppercase tracking-widest">Total Pagado</p>
                <p className="text-2xl font-bold text-teal-200">{booking.totalPrice} EUR</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
