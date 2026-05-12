import { NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: "Debes iniciar sesión para reservar" }, { status: 401 });
    }

    const { camperId, startDate, endDate } = await req.json();

    if (!camperId || !startDate || !endDate) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return NextResponse.json({ error: "La fecha de fin debe ser posterior a la de inicio" }, { status: 400 });
    }

    const camper = await prisma.camper.findUnique({
      where: { id: camperId },
    });

    if (!camper) {
      return NextResponse.json({ error: "Caravana no encontrada" }, { status: 404 });
    }

    // Calcular días (mínimo 1 día)
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * camper.pricePerDay;

    const booking = await prisma.booking.create({
      data: {
        userId: session.userId,
        camperId,
        startDate: start,
        endDate: end,
        totalPrice,
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Reserva creada exitosamente", booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.userId },
      include: {
        camper: {
          select: { name: true, images: true, location: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
