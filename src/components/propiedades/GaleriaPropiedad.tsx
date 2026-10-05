"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X, Images } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  imagenes: string[];
  titulo: string;
}

export default function GaleriaPropiedad({ imagenes, titulo }: Props) {
  const [lightbox, setLightbox] = useState(false);
  const shouldReduce = useReducedMotion();

  const galeriaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galeriaRef,
    offset: ["start end", "end start"],
  });
  // ±30px parallax; container extended ±40px so edges never show
  const yOffset = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <>
      {/* Desktop: 2/3 grande + 2 apiladas */}
      <div
        ref={galeriaRef}
        className="hidden md:grid grid-cols-3 gap-2 h-[480px] rounded-card overflow-hidden"
      >
        {/* Main large image with parallax */}
        <div className="col-span-2 relative overflow-hidden">
          <motion.div
            style={{
              y: shouldReduce ? 0 : yOffset,
              position: "absolute",
              top: -40,
              left: 0,
              right: 0,
              bottom: -40,
            }}
          >
            <Image
              src={imagenes[0]}
              alt={titulo}
              fill
              className="object-cover"
              priority
              sizes="66vw"
            />
          </motion.div>
        </div>

        {/* Side thumbnails */}
        <div className="flex flex-col gap-2">
          {imagenes.slice(1, 3).map((img, i) => (
            <div key={i} className="relative flex-1 overflow-hidden">
              <Image
                src={img}
                alt={`${titulo} ${i + 2}`}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          ))}
          {imagenes.length > 3 && (
            <button
              onClick={() => setLightbox(true)}
              className="flex items-center justify-center gap-2 bg-selva-oscuro/90 text-white text-sm font-medium py-2 hover:bg-selva-oscuro transition-colors"
            >
              <Images size={16} />+{imagenes.length - 3} fotos
            </button>
          )}
        </div>
      </div>

      {/* Mobile: scroll horizontal snap */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4">
        {imagenes.map((img, i) => (
          <div
            key={i}
            className="snap-start flex-shrink-0 w-[85vw] h-64 relative rounded-card overflow-hidden"
          >
            <Image
              src={img}
              alt={`${titulo} ${i + 1}`}
              fill
              className="object-cover"
              sizes="85vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex flex-col"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute top-4 right-5 text-white z-10 hover:text-niebla transition-colors">
            <X size={28} />
          </button>
          <div
            className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {imagenes.map((img, i) => (
              <div key={i} className="relative h-64 rounded-card overflow-hidden">
                <Image
                  src={img}
                  alt={`${titulo} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
