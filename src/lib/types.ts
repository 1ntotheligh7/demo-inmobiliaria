export type TipoOperacion = "venta" | "alquiler";

export interface Propiedad {
  id: string;
  titulo: string;
  zona: string;
  tipo: TipoOperacion;
  precio: number;
  moneda: "USD";
  m2: number;
  recamaras: number;
  banos: number;
  estacionamientos: number;
  descripcion: string;
  imagenPrincipal: string;
  imagenes: string[];
  lat: number;
  lng: number;
}

export interface FiltrosPropiedades {
  tipo: TipoOperacion | "todos";
  zona: string;
  precioMax: number;
  recamarasMin: number;
}
