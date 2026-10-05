import type { Propiedad, FiltrosPropiedades, TipoOperacion } from "./types";

export function formatPrecio(precio: number, tipo: TipoOperacion): string {
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(precio);
  return tipo === "alquiler" ? `${f}/mes` : f;
}

export function buildWhatsAppUrl(idPropiedad: string): string {
  const numero = (process.env.NEXT_PUBLIC_WA_NUMBER ?? "50760000000").replace(/\D/g, "");
  const mensaje = encodeURIComponent(
    `Hola, me interesa la propiedad ${idPropiedad}. ¿Pueden darme más información?`
  );
  return `https://wa.me/${numero}?text=${mensaje}`;
}

export function filtrarPropiedades(
  propiedades: Propiedad[],
  filtros: FiltrosPropiedades
): Propiedad[] {
  return propiedades.filter((p) => {
    if (filtros.tipo !== "todos" && p.tipo !== filtros.tipo) return false;
    if (filtros.zona && p.zona !== filtros.zona) return false;
    if (filtros.precioMax > 0 && p.precio > filtros.precioMax) return false;
    if (filtros.recamarasMin > 0 && p.recamaras < filtros.recamarasMin) return false;
    return true;
  });
}

export const ZONAS = [
  "Costa del Este",
  "Punta Pacífica",
  "Panamá Pacífico",
  "San Francisco",
  "El Cangrejo",
] as const;

export const PRECIOS_MAX_VENTA = [200000, 300000, 400000, 600000, 1000000];
export const PRECIOS_MAX_ALQUILER = [1000, 2000, 3000, 5000];
