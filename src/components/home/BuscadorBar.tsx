"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ZONAS, PRECIOS_MAX_VENTA, PRECIOS_MAX_ALQUILER } from "@/lib/utils";
import type { TipoOperacion } from "@/lib/types";

export default function BuscadorBar() {
  const router = useRouter();
  const [tipo, setTipo] = useState<TipoOperacion>("venta");
  const [zona, setZona] = useState("");
  const [precioMax, setPrecioMax] = useState(0);

  const precios = tipo === "venta" ? PRECIOS_MAX_VENTA : PRECIOS_MAX_ALQUILER;

  function handleBuscar() {
    const params = new URLSearchParams();
    params.set("tipo", tipo);
    if (zona) params.set("zona", zona);
    if (precioMax) params.set("precioMax", String(precioMax));
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-card shadow-card-hover p-4 sm:p-6 w-full max-w-3xl mx-auto">
      <div className="flex mb-4 border-b border-niebla/40">
        {(["venta", "alquiler"] as TipoOperacion[]).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTipo(t);
              setPrecioMax(0);
            }}
            className={`px-5 py-2 text-sm font-medium capitalize border-b-2 transition-colors -mb-px ${
              tipo === t
                ? "border-oro text-oro"
                : "border-transparent text-tinta/50 hover:text-tinta"
            }`}
          >
            {t === "venta" ? "Comprar" : "Alquilar"}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className="flex-1 border border-niebla/60 rounded-lg px-3 py-2.5 text-sm text-tinta bg-white focus:outline-none focus:ring-2 focus:ring-selva-medio"
        >
          <option value="">Todas las zonas</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <select
          value={precioMax}
          onChange={(e) => setPrecioMax(Number(e.target.value))}
          className="flex-1 border border-niebla/60 rounded-lg px-3 py-2.5 text-sm text-tinta bg-white focus:outline-none focus:ring-2 focus:ring-selva-medio"
        >
          <option value={0}>Precio máximo</option>
          {precios.map((p) => (
            <option key={p} value={p}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(p)}
              {tipo === "alquiler" ? "/mes" : ""}
            </option>
          ))}
        </select>

        <button
          onClick={handleBuscar}
          className="bg-selva-medio text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-selva-claro transition-colors whitespace-nowrap"
        >
          Buscar propiedades
        </button>
      </div>
    </div>
  );
}
