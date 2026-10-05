import propiedadesData from "@/data/propiedades.json";
import type { Propiedad } from "@/lib/types";
import PropiedadCard from "@/components/propiedades/PropiedadCard";
import FiltrosPanelWrapper from "./_components/FiltrosPanelWrapper";
import MapaWrapper from "./_components/MapaWrapper";

export default async function PropiedadesPage({
  searchParams,
}: PageProps<"/propiedades">) {
  const sp = await searchParams;
  const todas = propiedadesData as Propiedad[];

  const filtradas = todas.filter((p) => {
    if (sp.tipo && sp.tipo !== "todos" && p.tipo !== sp.tipo) return false;
    if (sp.zona && p.zona !== sp.zona) return false;
    if (sp.precioMax && p.precio > Number(sp.precioMax)) return false;
    if (sp.recamarasMin && p.recamaras < Number(sp.recamarasMin)) return false;
    return true;
  });

  return (
    <>
      <FiltrosPanelWrapper />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <section className="flex-1 min-w-0">
            <p className="text-sm text-niebla mb-5">
              {filtradas.length}{" "}
              {filtradas.length === 1 ? "propiedad" : "propiedades"}{" "}
              encontradas
            </p>

            {filtradas.length === 0 ? (
              <div className="text-center py-20 text-tinta/40">
                <p className="text-4xl mb-3">🏠</p>
                <p className="font-medium text-lg">
                  No encontramos propiedades con esos filtros
                </p>
                <p className="text-sm mt-2">
                  Intenta ampliar los criterios de búsqueda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filtradas.map((p) => (
                  <PropiedadCard key={p.id} propiedad={p} />
                ))}
              </div>
            )}
          </section>

          <aside className="lg:w-[420px] flex-shrink-0">
            <MapaWrapper propiedades={filtradas} />
          </aside>
        </div>
      </div>
    </>
  );
}
