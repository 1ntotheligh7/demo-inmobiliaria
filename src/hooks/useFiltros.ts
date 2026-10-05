"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { FiltrosPropiedades, TipoOperacion } from "@/lib/types";

export function useFiltros(): [
  FiltrosPropiedades,
  (parcial: Partial<FiltrosPropiedades>) => void
] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filtros: FiltrosPropiedades = {
    tipo: (searchParams.get("tipo") as TipoOperacion | "todos") || "todos",
    zona: searchParams.get("zona") || "",
    precioMax: Number(searchParams.get("precioMax")) || 0,
    recamarasMin: Number(searchParams.get("recamarasMin")) || 0,
  };

  const setFiltros = useCallback(
    (parcial: Partial<FiltrosPropiedades>) => {
      const next = { ...filtros, ...parcial };
      const params = new URLSearchParams();
      if (next.tipo !== "todos") params.set("tipo", next.tipo);
      if (next.zona) params.set("zona", next.zona);
      if (next.precioMax) params.set("precioMax", String(next.precioMax));
      if (next.recamarasMin)
        params.set("recamarasMin", String(next.recamarasMin));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams.toString(), pathname]
  );

  return [filtros, setFiltros];
}
