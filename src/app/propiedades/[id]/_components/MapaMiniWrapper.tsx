"use client";

import dynamic from "next/dynamic";

const MapaMini = dynamic(() => import("@/components/mapa/MapaMini"), {
  ssr: false,
});

interface Props {
  lat: number;
  lng: number;
}

export default function MapaMiniWrapper({ lat, lng }: Props) {
  return <MapaMini lat={lat} lng={lng} />;
}
