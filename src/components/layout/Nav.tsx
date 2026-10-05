"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Menu } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-selva-oscuro text-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-wide text-white hover:text-oro transition-colors"
        >
          Panama Realty
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/propiedades"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Propiedades
          </Link>
          <Link
            href="/vender"
            className="bg-oro text-selva-oscuro text-sm font-bold px-5 py-2 rounded-pill hover:brightness-110 transition-all"
          >
            Vende con nosotros
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-white"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-selva-oscuro border-t border-selva-medio px-4 py-5 flex flex-col gap-4">
          <Link
            href="/propiedades"
            onClick={() => setOpen(false)}
            className="text-white/80 font-medium text-sm"
          >
            Propiedades
          </Link>
          <Link
            href="/vender"
            onClick={() => setOpen(false)}
            className="bg-oro text-selva-oscuro text-sm font-bold px-5 py-2 rounded-pill text-center"
          >
            Vende con nosotros
          </Link>
        </div>
      )}
    </header>
  );
}
