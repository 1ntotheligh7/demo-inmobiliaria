import { notFound } from "next/navigation";
import type { Metadata } from "next";
import propiedadesData from "@/data/propiedades.json";
import type { Propiedad } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";
import GaleriaPropiedad from "@/components/propiedades/GaleriaPropiedad";
import FichaStats from "@/components/propiedades/FichaStats";
import BotonWhatsApp from "@/components/propiedades/BotonWhatsApp";
import MapaMiniWrapper from "./_components/MapaMiniWrapper";
import Link from "next/link";
import { MapPin } from "lucide-react";

export async function generateStaticParams() {
  return (propiedadesData as Propiedad[]).map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/propiedades/[id]">): Promise<Metadata> {
  const { id } = await params;
  const p = (propiedadesData as Propiedad[]).find((x) => x.id === id);
  if (!p) return {};
  return {
    title: `${p.titulo} | Panama Realty`,
    description: p.descripcion.slice(0, 155),
  };
}

export default async function FichaPage({
  params,
}: PageProps<"/propiedades/[id]">) {
  const { id } = await params;
  const p = (propiedadesData as Propiedad[]).find((x) => x.id === id);
  if (!p) notFound();

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-niebla mb-6 flex items-center gap-2">
        <Link href="/propiedades" className="hover:text-selva-medio transition-colors">
          Propiedades
        </Link>
        <span>›</span>
        <span className="text-tinta">{p.zona}</span>
      </nav>

      <GaleriaPropiedad imagenes={p.imagenes} titulo={p.titulo} />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mt-8 mb-6">
        <div>
          <p className="text-label uppercase tracking-widest text-selva-medio mb-1">
            {p.zona} · {p.tipo === "venta" ? "En venta" : "En alquiler"}
          </p>
          <h1 className="font-serif text-display text-tinta">{p.titulo}</h1>
          <p className="text-sm text-niebla mt-1">Código: {p.id}</p>
        </div>
        <div className="md:text-right flex-shrink-0">
          <p className="text-3xl font-bold text-oro">
            {formatPrecio(p.precio, p.tipo)}
          </p>
          <p className="text-sm text-niebla mt-0.5">USD · {p.m2} m²</p>
        </div>
      </div>

      <FichaStats
        m2={p.m2}
        recamaras={p.recamaras}
        banos={p.banos}
        estacionamientos={p.estacionamientos}
      />

      <section className="mt-8">
        <h2 className="font-serif text-heading text-tinta mb-3">Descripción</h2>
        <p className="text-tinta/70 leading-relaxed max-w-3xl">{p.descripcion}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-heading text-tinta mb-3 flex items-center gap-2">
          <MapPin size={18} className="text-selva-medio" />
          Ubicación aproximada
        </h2>
        <div className="h-72 rounded-card overflow-hidden border border-niebla/30">
          <MapaMiniWrapper lat={p.lat} lng={p.lng} />
        </div>
        <p className="text-xs text-niebla mt-2">
          Ubicación aproximada — la dirección exacta se comparte tras consulta.
        </p>
      </section>

      <section className="mt-10 bg-piedra rounded-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-serif text-heading text-tinta">
            ¿Te interesa esta propiedad?
          </p>
          <p className="text-sm text-niebla mt-1">
            Nuestro equipo te responde en menos de 2 horas
          </p>
        </div>
        <BotonWhatsApp
          codigoWhatsApp={p.codigoWhatsApp}
          idPropiedad={p.id}
          className="min-w-[220px]"
        />
      </section>
    </article>
  );
}
