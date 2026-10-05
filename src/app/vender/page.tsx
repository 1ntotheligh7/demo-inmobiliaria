import type { Metadata } from "next";
import FormularioVender from "@/components/vender/FormularioVender";
import { Shield, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Vende tu propiedad | Panama Realty",
  description:
    "Conéctate con compradores calificados. Valuación gratuita, proceso transparente y cierre rápido.",
};

const BENEFICIOS = [
  {
    icon: Shield,
    titulo: "Valuación gratuita",
    desc: "Estimamos el valor de mercado de tu propiedad sin costo ni compromiso.",
  },
  {
    icon: Users,
    titulo: "Compradores verificados",
    desc: "Trabajamos solo con compradores con capacidad financiera comprobada.",
  },
  {
    icon: Clock,
    titulo: "Cierre en 60 días",
    desc: "Proceso ágil con soporte legal incluido para cerrar tu operación rápido.",
  },
];

export default function VenderPage() {
  return (
    <div className="min-h-screen bg-blanco-piedra">
      <div className="bg-selva-oscuro text-white py-16 px-4 text-center">
        <p className="text-label uppercase tracking-[0.2em] text-oro mb-3">
          Panama Realty
        </p>
        <h1 className="font-serif text-display text-white">
          Vende tu propiedad con nosotros
        </h1>
        <p className="text-white/70 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
          Accede a nuestra base de compradores calificados. Valuación sin costo
          y proceso transparente de principio a fin.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {BENEFICIOS.map(({ icon: Icon, titulo, desc }) => (
          <div key={titulo} className="bg-white rounded-card p-6 shadow-card text-center">
            <Icon size={28} className="text-selva-medio mx-auto mb-3" />
            <h3 className="font-serif text-heading text-selva-oscuro mb-2">
              {titulo}
            </h3>
            <p className="text-sm text-niebla">{desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-serif text-heading text-tinta mb-6 text-center">
          Cuéntanos sobre tu propiedad
        </h2>
        <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
          <FormularioVender />
        </div>
      </div>
    </div>
  );
}
