import { NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

// Actualizar caravana (ADMIN o EDITOR)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await verifySession();
    const allowedRoles = ["ADMIN", "EDITOR"];
    if (!session || !allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const data = await req.json();
    const { id } = params;

    const camper = await prisma.camper.update({
      where: { id },
      data: {
        name: data.name,
        tagline: data.tagline,
        pricePerDay: parseInt(data.pricePerDay),
        sleep: parseInt(data.sleep),
        seats: parseInt(data.seats),
        transmission: data.transmission,
        location: data.location,
        rating: parseFloat(data.rating),
        reviews: parseInt(data.reviews),
        features: Array.isArray(data.features) ? data.features : [data.features],
        images: Array.isArray(data.images) ? data.images : [data.images],
        accent: data.accent,
      },
    });

    return NextResponse.json({ message: "Caravana actualizada", camper }, { status: 200 });
  } catch (error) {
    console.error("Error updating camper:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// Eliminar caravana (ADMIN o EDITOR)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await verifySession();
    const allowedRoles = ["ADMIN", "EDITOR"];
    if (!session || !allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { id } = params;

    await prisma.camper.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Caravana eliminada" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting camper:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// Obtener una caravana específica (para el formulario de edición)
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const camper = await prisma.camper.findUnique({
        where: { id },
      });
  
      if (!camper) {
        return NextResponse.json({ error: "No encontrada" }, { status: 404 });
      }
  
      return NextResponse.json({ camper }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
  }
