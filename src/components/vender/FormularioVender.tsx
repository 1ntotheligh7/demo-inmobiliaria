"use client";

import { useState, type FormEvent } from "react";
import { ZONAS } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface FormState {
  nombre: string;
  telefono: string;
  email: string;
  zona: string;
  tipoOperacion: "venta" | "alquiler";
  descripcion: string;
}

const EMPTY: FormState = {
  nombre: "",
  telefono: "",
  email: "",
  zona: "",
  tipoOperacion: "venta",
  descripcion: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function FormularioVender() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [enviado, setEnviado] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!form.telefono.match(/^\+?[\d\s\-]{7,15}$/))
      e.telefono = "Teléfono inválido";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Email inválido";
    if (!form.zona) e.zona = "Selecciona una zona";
    if (form.descripcion.trim().length < 20)
      e.descripcion = "Describe tu propiedad (mínimo 20 caracteres)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      setEnviado(true);
      setForm(EMPTY);
    }
  }

  const inputClass = (field: keyof FormState) =>
    `w-full border rounded-lg px-4 py-2.5 text-sm text-tinta bg-white focus:outline-none focus:ring-2 focus:ring-selva-medio transition-colors ${
      errors[field] ? "border-red-400" : "border-niebla/60"
    }`;

  if (enviado) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={56} className="text-selva-medio mx-auto mb-4" />
        <h3 className="font-serif text-heading text-tinta mb-2">
          ¡Recibimos tu solicitud!
        </h3>
        <p className="text-niebla text-sm">
          Un asesor se pondrá en contacto contigo en las próximas 24 horas.
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="mt-6 text-selva-medio underline text-sm hover:text-selva-oscuro transition-colors"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label className="block text-sm font-medium text-tinta mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          placeholder="Juan Pérez"
          value={form.nombre}
          onChange={(e) => set("nombre", e.target.value)}
          className={inputClass("nombre")}
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-tinta mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          placeholder="+507 6000-0000"
          value={form.telefono}
          onChange={(e) => set("telefono", e.target.value)}
          className={inputClass("telefono")}
        />
        {errors.telefono && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-tinta mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          placeholder="juan@email.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className={inputClass("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-tinta mb-1">
          Zona de la propiedad
        </label>
        <select
          value={form.zona}
          onChange={(e) => set("zona", e.target.value)}
          className={inputClass("zona")}
        >
          <option value="">Selecciona una zona</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
        {errors.zona && (
          <p className="text-red-500 text-xs mt-1">{errors.zona}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-tinta mb-2">
          Tipo de operación
        </label>
        <div className="flex gap-6">
          {(["venta", "alquiler"] as const).map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={t}
                checked={form.tipoOperacion === t}
                onChange={() => set("tipoOperacion", t)}
                className="accent-selva-medio w-4 h-4"
              />
              <span className="text-sm capitalize text-tinta">
                {t === "venta" ? "Venta" : "Alquiler"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-tinta mb-1">
          Describe tu propiedad
        </label>
        <textarea
          rows={4}
          value={form.descripcion}
          onChange={(e) => set("descripcion", e.target.value)}
          placeholder="Tipo de propiedad, características principales, precio esperado..."
          className={`${inputClass("descripcion")} resize-none`}
        />
        {errors.descripcion && (
          <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full bg-selva-medio text-white py-3 rounded-pill font-bold text-sm hover:bg-selva-claro transition-colors"
        >
          Enviar solicitud
        </button>
      </div>
    </form>
  );
}
