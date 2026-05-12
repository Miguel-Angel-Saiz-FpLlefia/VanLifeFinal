"use client";

import { useState } from "react";

export default function AddCamperPage() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    tagline: "",
    pricePerDay: "",
    sleep: "",
    seats: "",
    transmission: "Manual",
    location: "",
    rating: "",
    reviews: "",
    accent: "#14b8a6",
    features: "",
    images: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/campers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pricePerDay: parseInt(formData.pricePerDay) || 0,
          sleep: parseInt(formData.sleep) || 0,
          seats: parseInt(formData.seats) || 0,
          rating: parseFloat(formData.rating) || 0,
          reviews: parseInt(formData.reviews) || 0,
          features: (typeof formData.features === 'string' ? formData.features.split(",") : []).map(f => f.trim()).filter(Boolean),
          images: (typeof formData.images === 'string' ? formData.images.split(",") : []).map(i => i.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al añadir la caravana");

      setMessage("¡Caravana añadida exitosamente!");
      setFormData({
        id: "", name: "", tagline: "", pricePerDay: "", sleep: "", seats: "", 
        transmission: "Manual", location: "", rating: "", reviews: "", 
        accent: "#14b8a6", features: "", images: ""
      });
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
      <h1 className="text-2xl font-semibold text-white mb-6">Añadir Nueva Caravana</h1>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes("Error") ? "bg-red-950/50 text-red-400" : "bg-teal-950/50 text-teal-400"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">ID (slug único)</label>
            <input name="id" value={formData.id} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="ej: vw-california" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Nombre</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="Volkswagen California" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Eslogan (Tagline)</label>
            <input name="tagline" value={formData.tagline} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="La clásica y aventurera" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Precio por Día (€)</label>
            <input name="pricePerDay" type="number" value={formData.pricePerDay} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Plazas (Dormir / Viajar)</label>
            <div className="flex gap-4">
              <input name="sleep" type="number" value={formData.sleep} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="Dormir" />
              <input name="seats" type="number" value={formData.seats} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="Viajar" />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Transmisión</label>
            <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white">
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Ubicación</label>
            <input name="location" value={formData.location} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="Madrid, España" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Rating Inicial (0-5)</label>
            <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Nº Reseñas</label>
            <input name="reviews" type="number" value={formData.reviews} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Características (separadas por coma)</label>
            <input name="features" value={formData.features} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="Cocina, Ducha, Calefacción" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">URLs de Imágenes (separadas por coma)</label>
            <input name="images" value={formData.images} onChange={handleChange} required className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Color de Acento (Hexadecimal)</label>
            <input name="accent" type="color" value={formData.accent} onChange={handleChange} required className="w-full h-10 bg-slate-950/40 border border-white/10 rounded-xl px-2 text-white cursor-pointer" />
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 mt-8">
          {loading ? "Guardando..." : "Añadir Caravana"}
        </button>
      </form>
    </div>
  );
}
