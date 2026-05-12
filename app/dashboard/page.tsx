"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Camper {
  id: string;
  name: string;
  location: string;
  pricePerDay: number;
}

export default function CampersListPage() {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campers")
      .then(res => res.json())
      .then(data => {
        setCampers(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta caravana?")) return;

    try {
      const res = await fetch(`/api/campers/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCampers(campers.filter(c => c.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Error al eliminar");
      }
    } catch (err) {
      alert("Error de conexión");
    }
  };

  if (loading) return <div className="text-white">Cargando caravanas...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Gestionar Caravanas</h1>
        <Link href="/dashboard/campers/new" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2 px-4 rounded-xl text-sm transition-colors">
          + Añadir Nueva
        </Link>
      </div>
      
      <div className="grid gap-4">
        {campers.map((camper) => (
          <div key={camper.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
            <div>
              <h3 className="text-lg font-semibold text-white">{camper.name}</h3>
              <p className="text-sm text-slate-400">{camper.location} • {camper.pricePerDay}€ / día</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href={`/dashboard/campers/${camper.id}/edit`}
                className="text-sm font-semibold text-teal-400 hover:text-teal-300 px-3 py-1 rounded-lg hover:bg-teal-400/10 transition-all"
              >
                Editar
              </Link>
              <button 
                onClick={() => handleDelete(camper.id)}
                className="text-sm font-semibold text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-400/10 transition-all"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {campers.length === 0 && (
          <div className="text-center py-12 text-slate-500 italic">No hay caravanas registradas.</div>
        )}
      </div>
    </div>
  );
}
