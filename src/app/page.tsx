import Hero from "@/components/home/Hero";
import PropiedadCard from "@/components/propiedades/PropiedadCard";
import propiedadesData from "@/data/propiedades.json";
import type { Propiedad } from "@/lib/types";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";
import StatsStrip from "@/components/home/StatsStrip";

export default function HomePage() {
  const destacadas = (propiedadesData as Propiedad[]).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="bg-piedra py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <h2 className="font-serif text-display text-tinta mb-2">
              Propiedades destacadas
            </h2>
            <p className="text-niebla text-sm mb-8">
              Selección de nuestro portafolio premium
            </p>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destacadas.map((p, i) => (
              <FadeInView key={p.id} delay={i * 0.12} className="flex flex-col">
                <PropiedadCard propiedad={p} />
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.3}>
            <div className="text-center mt-10">
              <Link
                href="/propiedades"
                className="inline-block border-2 border-selva-medio text-selva-medio px-8 py-3 rounded-pill font-medium hover:bg-selva-medio hover:text-white transition-all"
              >
                Ver todas las propiedades
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      <StatsStrip />

      <section className="bg-selva-oscuro py-20 text-center text-white">
        <FadeInView>
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-serif text-display mb-4">
              ¿Deseas vender tu propiedad?
            </h2>
            <p className="text-white/70 mb-8 text-sm leading-relaxed">
              Te conectamos con compradores calificados. Proceso transparente y
              sin complicaciones.
            </p>
            <Link
              href="/vender"
              className="inline-block bg-oro text-selva-oscuro px-8 py-3 rounded-pill font-bold hover:brightness-110 transition-all"
            >
              Empieza aquí
            </Link>
          </div>
        </FadeInView>
      </section>
    </>
  );
}
