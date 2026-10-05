"use client";

import { useFiltros } from "@/hooks/useFiltros";
import { ZONAS, PRECIOS_MAX_VENTA, PRECIOS_MAX_ALQUILER } from "@/lib/utils";

export default function FiltrosPanel() {
  const [filtros, setFiltros] = useFiltros();
  const precios =
    filtros.tipo === "alquiler" ? PRECIOS_MAX_ALQUILER : PRECIOS_MAX_VENTA;

  return (
    <div className="bg-white border-b border-niebla/40 sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2 items-center">
        <div className="flex rounded-pill border border-niebla/60 overflow-hidden text-sm">
          {(["todos", "venta", "alquiler"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFiltros({ tipo: t, precioMax: 0 })}
              className={`px-4 py-1.5 font-medium transition-colors ${
                filtros.tipo === t
                  ? "bg-selva-medio text-white"
                  : "text-tinta/60 hover:text-tinta bg-white"
              }`}
            >
              {t === "todos" ? "Todos" : t === "venta" ? "Comprar" : "Alquilar"}
            </button>
          ))}
        </div>

        <select
          value={filtros.zona}
          onChange={(e) => setFiltros({ zona: e.target.value })}
          className="border border-niebla/60 rounded-pill px-4 py-1.5 text-sm text-tinta bg-white focus:outline-none focus:ring-2 focus:ring-selva-medio"
        >
          <option value="">Zona: todas</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <select
          value={filtros.precioMax}
          onChange={(e) => setFiltros({ precioMax: Number(e.target.value) })}
          className="border border-niebla/60 rounded-pill px-4 py-1.5 text-sm text-tinta bg-white focus:outline-none focus:ring-2 focus:ring-selva-medio"
        >
          <option value={0}>Precio: cualquiera</option>
          {precios.map((p) => (
            <option key={p} value={p}>
              Hasta{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(p)}
              {filtros.tipo === "alquiler" ? "/mes" : ""}
            </option>
          ))}
        </select>

        <select
          value={filtros.recamarasMin}
          onChange={(e) =>
            setFiltros({ recamarasMin: Number(e.target.value) })
          }
          className="border border-niebla/60 rounded-pill px-4 py-1.5 text-sm text-tinta bg-white focus:outline-none focus:ring-2 focus:ring-selva-medio"
        >
          <option value={0}>Recámaras: cualquiera</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}+ recámaras
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
