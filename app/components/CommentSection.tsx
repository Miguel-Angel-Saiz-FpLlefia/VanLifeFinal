"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  user: { name: string };
}

export default function CommentSection({ camperId }: { camperId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [camperId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/campers/${camperId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Error loading comments:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/campers/${camperId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment, rating }),
      });

      if (res.ok) {
        setNewComment("");
        setRating(5);
        fetchComments();
      } else {
        const data = await res.json().catch(() => ({ error: "Error de servidor" }));
        alert(data.error || "Inicia sesión para comentar");
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      alert("Error al enviar comentario: " + (err.message || "Error desconocido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      <h2 className="text-2xl font-semibold text-white">Comentarios y Opiniones</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Comparte tu experiencia con esta camper..."
          className="w-full bg-slate-950/40 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm min-h-[100px] focus:outline-none focus:border-teal-500/50"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 uppercase tracking-widest">Valoración:</span>
            <select 
              value={rating} 
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-xs text-white"
            >
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} estrellas</option>)}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="rounded-full bg-teal-400 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Publicar comentario"}
          </button>
        </div>
      </form>

      {/* Lista */}
      <div className="space-y-4">
        {fetching ? (
          <div className="text-slate-500 italic text-sm">Cargando comentarios...</div>
        ) : comments.length === 0 ? (
          <div className="text-slate-500 italic text-sm">Aún no hay comentarios. ¡Sé el primero en opinar!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="rounded-2xl border border-white/5 bg-slate-950/20 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300 font-bold text-xs">
                    {comment.user.name?.[0] || "?"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{comment.user.name || "Usuario"}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-teal-300 text-xs font-bold">
                  {"★".repeat(comment.rating)}
                  {"☆".repeat(5 - comment.rating)}
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
