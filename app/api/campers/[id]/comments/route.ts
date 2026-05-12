import { NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

// Crear un comentario
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: "Debes iniciar sesión para comentar" }, { status: 401 });
    }

    const paramsResolved = await params;
    const id = decodeURIComponent(paramsResolved.id);
    const { content, rating } = await req.json();

    const camperExists = await prisma.camper.findUnique({ where: { id } });
    if (!camperExists) {
      return NextResponse.json({ error: `La caravana con ID '${id}' no existe` }, { status: 404 });
    }

    if (!content) {
      return NextResponse.json({ error: "El contenido es obligatorio" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        rating: rating || 5,
        userId: session.userId,
        camperId: id,
      },
      include: {
        user: { select: { name: true } }
      }
    });

    return NextResponse.json({ message: "Comentario añadido", comment }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
  }
}

// Listar comentarios de una caravana
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const paramsResolved = await params;
    const id = decodeURIComponent(paramsResolved.id);
    const comments = await prisma.comment.findMany({
      where: { camperId: id },
      include: {
        user: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
