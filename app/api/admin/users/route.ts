import { NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

// Listar todos los usuarios (solo ADMIN)
export async function GET() {
  try {
    const session = await verifySession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// Cambiar rol de un usuario (solo ADMIN)
export async function PATCH(req: Request) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // No permitirse cambiar el propio rol para no quedarse sin admin
    if (userId === session.userId) {
      return NextResponse.json({ error: "No puedes cambiar tu propio rol" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({ message: "Rol actualizado", user: { id: user.id, role: user.role } }, { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
