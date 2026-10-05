"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { Propiedad } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function precioIcon(label: string): L.DivIcon {
  return L.divIcon({
    html: `<div style="background:#183328;color:#C9A84C;font-size:11px;font-weight:700;padding:4px 8px;border-radius:9999px;white-space:nowrap;box-shadow:0 2px 8px rgba(15,26,20,.25);border:1.5px solid #C9A84C;">${label}</div>`,
    className: "",
    iconAnchor: [40, 16],
    popupAnchor: [0, -20],
  });
}

const PANAMA: [number, number] = [8.9936, -79.5197];

interface Props {
  propiedades: Propiedad[];
}

export default function MapaListado({ propiedades }: Props) {
  return (
    <MapContainer
      center={PANAMA}
      zoom={12}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {propiedades.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={precioIcon(
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
              maximumFractionDigits: 0,
            }).format(p.precio) + (p.tipo === "alquiler" ? "/mes" : "")
          )}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 4,
                  lineHeight: 1.3,
                }}
              >
                {p.titulo}
              </p>
              <p
                style={{
                  color: "#C9A84C",
                  fontWeight: 700,
                  marginBottom: 8,
                  fontSize: 14,
                }}
              >
                {formatPrecio(p.precio, p.tipo)}
              </p>
              <Link
                href={`/propiedades/${p.id}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#2C6B4F",
                  color: "#fff",
                  fontSize: 12,
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Ver propiedad
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
