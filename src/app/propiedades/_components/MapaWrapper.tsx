"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { X, MapPin } from "lucide-react";
import type { Propiedad } from "@/lib/types";

const MapaListado = dynamic(
  () => import("@/components/mapa/MapaListado"),
  { ssr: false }
);

interface Props {
  propiedades: Propiedad[];
}

export default function MapaWrapper({ propiedades }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block sticky top-28 h-[calc(100vh-8rem)] rounded-card overflow-hidden border border-niebla/30">
        <MapaListado propiedades={propiedades} />
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-selva-oscuro text-white py-3 rounded-card font-medium text-sm"
        >
          <MapPin size={16} />
          Ver en mapa ({propiedades.length})
        </button>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
            <div className="bg-white w-full h-3/4 rounded-t-2xl overflow-hidden flex flex-col">
              <div className="flex justify-between items-center px-4 py-3 border-b border-niebla/30">
                <p className="font-medium text-sm text-tinta">
                  {propiedades.length} propiedades
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-tinta/40 hover:text-tinta transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1">
                <MapaListado propiedades={propiedades} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
