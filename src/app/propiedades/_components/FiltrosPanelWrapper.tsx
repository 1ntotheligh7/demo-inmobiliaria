"use client";

import { Suspense } from "react";
import FiltrosPanel from "@/components/propiedades/FiltrosPanel";

export default function FiltrosPanelWrapper() {
  return (
    <Suspense
      fallback={
        <div className="h-14 bg-white border-b border-niebla/40 shadow-sm" />
      }
    >
      <FiltrosPanel />
    </Suspense>
  );
}
