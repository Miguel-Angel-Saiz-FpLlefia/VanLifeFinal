import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { verifySession } from "@/app/lib/session";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Verificar autenticación y rol
    const session = await verifySession();
    
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }

    const data = await req.json();

    // Validar datos básicos
    if (!data.id || !data.name || !data.pricePerDay) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Comprobar si el ID ya existe
    const existingCamper = await prisma.camper.findUnique({
      where: { id: data.id },
    });

    if (existingCamper) {
      return NextResponse.json(
        { error: "Ya existe una caravana con ese ID" },
        { status: 400 }
      );
    }

    // Asegurar que features e images sean arrays
    const features = Array.isArray(data.features) 
      ? data.features 
      : (typeof data.features === 'string' ? data.features.split(',').map((f: string) => f.trim()).filter(Boolean) : []);
      
    const images = Array.isArray(data.images) 
      ? data.images 
      : (typeof data.images === 'string' ? data.images.split(',').map((i: string) => i.trim()).filter(Boolean) : []);

    // Crear la caravana
    const newCamper = await prisma.camper.create({
      data: {
        id: data.id,
        name: data.name,
        tagline: data.tagline,
        pricePerDay: data.pricePerDay,
        sleep: data.sleep,
        seats: data.seats,
        transmission: data.transmission,
        location: data.location,
        rating: data.rating,
        reviews: data.reviews,
        features: features,
        images: images,
        accent: data.accent,
      },
    });

    return NextResponse.json(
      { message: "Caravana creada exitosamente", camper: newCamper },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear caravana:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
