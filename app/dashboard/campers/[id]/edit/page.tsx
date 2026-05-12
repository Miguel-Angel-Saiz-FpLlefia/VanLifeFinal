"use client";

import { use, useEffect, useState } from "react";
import CamperForm from "@/app/components/CamperForm";
import { useParams } from "next/navigation";

export default function EditCamperPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log("Fetching camper with ID:", id);
      fetch(`/api/campers/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log("Camper data received:", data);
          setCamper(data.camper);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching camper:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="text-white">Cargando datos de la caravana...</div>;
  if (!camper) return <div className="text-red-400">No se encontró la caravana.</div>;

  return <CamperForm initialData={camper} isEdit={true} />;
}
