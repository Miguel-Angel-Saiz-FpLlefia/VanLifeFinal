import { NextResponse } from "next/server";
import { deleteSession } from "@/app/lib/session";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await deleteSession();
    return NextResponse.json({ message: "Sesión cerrada correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
