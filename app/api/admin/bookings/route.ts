import { NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

// Obtener todas las reservas (ADMIN)
export async function GET() {
  try {
    const session = await verifySession();
    const allowedRoles = ["ADMIN", "EDITOR"];
    if (!session || !allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const bookings = await prisma.booking.findMany({
      include: {
        user: { select: { name: true, email: true } },
        camper: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin bookings:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// Actualizar estado de reserva (ADMIN)
export async function PATCH(req: Request) {
  try {
    const session = await verifySession();
    const allowedRoles = ["ADMIN", "EDITOR"];
    if (!session || !allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return NextResponse.json({ message: "Reserva actualizada", booking }, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
