import { BedDouble, ShowerHead, Maximize2, Car } from "lucide-react";

interface Props {
  m2: number;
  recamaras: number;
  banos: number;
  estacionamientos: number;
}

function Stat({
  icon,
  valor,
  unidad,
  etiqueta,
}: {
  icon: React.ReactNode;
  valor: number;
  unidad?: string;
  etiqueta: string;
}) {
  return (
    <div className="flex flex-col items-center bg-piedra rounded-xl p-4 text-center gap-1">
      <span className="text-selva-medio">{icon}</span>
      <span className="text-2xl font-bold text-selva-oscuro">
        {valor}
        {unidad && (
          <span className="text-sm font-normal text-niebla ml-0.5">{unidad}</span>
        )}
      </span>
      <span className="text-label uppercase tracking-widest text-tinta/50">
        {etiqueta}
      </span>
    </div>
  );
}

export default function FichaStats({ m2, recamaras, banos, estacionamientos }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat icon={<Maximize2 size={22} />} valor={m2} unidad="m²" etiqueta="Superficie" />
      <Stat icon={<BedDouble size={22} />} valor={recamaras} etiqueta="Recámaras" />
      <Stat icon={<ShowerHead size={22} />} valor={banos} etiqueta="Baños" />
      <Stat icon={<Car size={22} />} valor={estacionamientos} etiqueta="Estacionam." />
    </div>
  );
}
