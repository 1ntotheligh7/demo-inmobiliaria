import { buildWhatsAppUrl } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface Props {
  idPropiedad: string;
  className?: string;
}

export default function BotonWhatsApp({ idPropiedad, className = "" }: Props) {
  const url = buildWhatsAppUrl(idPropiedad);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-pill hover:brightness-105 transition-all ${className}`}
    >
      <MessageCircle size={20} />
      Consultar por WhatsApp
    </a>
  );
}
