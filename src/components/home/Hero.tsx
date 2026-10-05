"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BuscadorBar from "./BuscadorBar";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    type NavWithConn = Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const conn = (navigator as NavWithConn).connection;
    const isSlow = conn
      ? conn.saveData === true ||
        conn.effectiveType === "2g" ||
        conn.effectiveType === "slow-2g"
      : false;
    if (!isSlow) setShowVideo(true);
  }, []);

  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/videos/hero-poster.jpg')" }}
        />
      )}

      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="relative z-10 text-center text-white px-4 py-16 w-full max-w-5xl mx-auto">
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="text-label uppercase tracking-[0.2em] text-oro mb-4"
        >
          Ciudad de Panamá
        </motion.p>

        <motion.h1
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="font-serif text-hero font-semibold mb-6 text-white"
        >
          Encuentra tu propiedad
          <br />
          ideal en Panamá
        </motion.h1>

        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
          className="text-lg text-white/80 mb-10 max-w-xl mx-auto"
        >
          Costa del Este, Punta Pacífica, San Francisco y más zonas premium
          con las mejores oportunidades de inversión.
        </motion.p>

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56, ease }}
        >
          <BuscadorBar />
        </motion.div>
      </div>
    </section>
  );
}
