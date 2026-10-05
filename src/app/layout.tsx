import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import BotonFlotanteWhatsApp from "@/components/layout/BotonFlotanteWhatsApp";
import LenisProvider from "@/components/providers/LenisProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Panama Realty | Propiedades Premium en Panamá",
  description:
    "Encuentra apartamentos, casas y propiedades de lujo en Costa del Este, Punta Pacífica, San Francisco y más zonas premium de Ciudad de Panamá.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-blanco-piedra text-tinta">
        <LenisProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <BotonFlotanteWhatsApp />
        </LenisProvider>
      </body>
    </html>
  );
}
