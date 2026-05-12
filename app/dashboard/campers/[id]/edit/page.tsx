"use client";

import { useEffect, useState } from "react";
import CamperForm from "@/app/components/CamperForm";
import { useParams } from "next/navigation";

export default function EditCamperPage() {
  const params = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/campers/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setCamper(data.camper);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div className="text-white">Cargando datos de la caravana...</div>;
  if (!camper) return <div className="text-red-400">No se encontró la caravana.</div>;

  return <CamperForm initialData={camper} isEdit={true} />;
}
