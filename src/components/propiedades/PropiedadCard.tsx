"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, ShowerHead, Maximize2 } from "lucide-react";
import type { Propiedad } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";

interface Props {
  propiedad: Propiedad;
}

export default function PropiedadCard({ propiedad: p }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduce ? {} : { y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/propiedades/${p.id}`}
        className="group block h-full rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-shadow bg-white"
      >
        <div className="relative h-52 overflow-hidden">
          <Image
            src={p.imagenPrincipal}
            alt={p.titulo}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-card-gradient" />
          <span className="absolute top-3 left-3 bg-selva-oscuro/90 text-white text-label uppercase tracking-widest px-3 py-1 rounded-pill">
            {p.zona}
          </span>
          <span
            className={`absolute top-3 right-3 text-label uppercase tracking-widest px-3 py-1 rounded-pill font-medium ${
              p.tipo === "venta"
                ? "bg-oro text-selva-oscuro"
                : "bg-selva-medio text-white"
            }`}
          >
            {p.tipo === "venta" ? "Venta" : "Alquiler"}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold text-tinta mb-1 line-clamp-2 leading-snug">
            {p.titulo}
          </h3>
          <p className="text-precio text-oro font-bold mb-3">
            {formatPrecio(p.precio, p.tipo)}
          </p>

          <div className="flex items-center gap-4 text-sm text-tinta/60 border-t border-niebla/30 pt-3">
            <span className="flex items-center gap-1.5">
              <BedDouble size={15} />
              {p.recamaras}
            </span>
            <span className="flex items-center gap-1.5">
              <ShowerHead size={15} />
              {p.banos}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 size={15} />
              {p.m2} m²
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
