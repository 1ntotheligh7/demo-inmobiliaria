"use client";

import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
}

export default function MapaMini({ lat, lng }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={[lat, lng]}
        radius={200}
        pathOptions={{
          color: "#2C6B4F",
          fillColor: "#2C6B4F",
          fillOpacity: 0.25,
        }}
      />
    </MapContainer>
  );
}
