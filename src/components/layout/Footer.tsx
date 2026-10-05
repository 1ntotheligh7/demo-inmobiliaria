import Link from "next/link";
import { ZONAS } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-selva-oscuro text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-serif text-xl text-white font-semibold mb-2">
              Panama Realty
            </p>
            <p className="text-sm leading-relaxed">
              Propiedades premium en las mejores zonas de Ciudad de Panamá.
              Asesoría personalizada para compra, venta y alquiler.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-3 uppercase tracking-widest text-label">
              Explorar
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/propiedades?tipo=venta"
                  className="hover:text-oro transition-colors"
                >
                  Comprar
                </Link>
              </li>
              <li>
                <Link
                  href="/propiedades?tipo=alquiler"
                  className="hover:text-oro transition-colors"
                >
                  Alquilar
                </Link>
              </li>
              <li>
                <Link
                  href="/vender"
                  className="hover:text-oro transition-colors"
                >
                  Vender
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-3 uppercase tracking-widest text-label">
              Zonas
            </p>
            <ul className="space-y-2 text-sm">
              {ZONAS.map((z) => (
                <li key={z}>
                  <Link
                    href={`/propiedades?zona=${encodeURIComponent(z)}`}
                    className="hover:text-oro transition-colors"
                  >
                    {z}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs border-t border-selva-medio pt-6 text-center">
          © {new Date().getFullYear()} Panama Realty. Sitio de demostración.
        </p>
      </div>
    </footer>
  );
}
