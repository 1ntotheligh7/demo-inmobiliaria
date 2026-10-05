# 🏡 Demo Inmobiliaria — Panama Realty

> **ES:** Caso de estudio: cómo una pyme inmobiliaria en Panamá puede tener hoy una web moderna y completa, construida con ayuda de IA.
> **EN:** Case study: how a small Panamanian real-estate business can launch a modern, full-featured website today, built with AI assistance.

🔗 **Demo:** _próximamente · coming soon_ (Vercel)

> ⚠️ Marca, propiedades, coordenadas y contacto son **ficticios**. Imágenes de Unsplash.
> *Brand, listings, coordinates and contact info are **fictional**. Images from Unsplash.*

---

## 🇪🇸 Español

### El problema
Las inmobiliarias pequeñas en Panamá suelen depender de portales de terceros o de redes sociales. No tienen equipo técnico ni presupuesto para una web a la medida.

### La solución
Un sitio rápido, visual y fácil de mantener, sin base de datos ni servicios de pago. Las propiedades viven en un archivo JSON que se actualiza en minutos.

### Funciones
- **Hero con video** en loop, con imagen de respaldo en conexiones lentas (`saveData`)
- **Buscador** por operación (comprar/alquilar), zona y precio máximo
- **Listado con filtros en la URL** (compartibles) y **mapa interactivo** con precios (Leaflet + OpenStreetMap)
- **Ficha de propiedad:** galería con parallax y lightbox, características y ubicación aproximada (círculo, nunca la dirección exacta)
- **WhatsApp flotante** con mensaje prellenado que incluye el código de la propiedad
- **Formulario "Vende tu propiedad"** con validación
- **Contadores animados** y transiciones suaves
- **Accesibilidad:** respeta `prefers-reduced-motion`

### Cómo se construyó
- Desarrollado con **Claude Code** (IA) como copiloto: yo definí el negocio, la estructura y los criterios de calidad; la IA aceleró la implementación
- Decisiones clave:
  - **Sin base de datos:** JSON estático, con costo de operación casi cero y menos riesgo
  - **Sin API keys:** OpenStreetMap en lugar de Google Maps
  - **Server Components por defecto:** `'use client'` solo donde hay estado o mapa
  - **Privacidad:** ubicaciones aproximadas, sin direcciones exactas

### Costo de operación estimado
| Concepto | Costo |
|---|---|
| Hosting (Vercel, plan gratuito) | $0 |
| Mapas (OpenStreetMap) | $0 |
| Dominio `.com` | ~$12/año |

### Próximos pasos
- Panel de administración para editar propiedades sin tocar código
- Integración WhatsApp + automatización de seguimiento (n8n)
- Deploy con dominio propio

---

## 🇺🇸 English (summary)
A real-estate website for a small business in Panama: video hero, search by operation, zone and price, URL-based filters with an interactive price map, property pages with a parallax gallery, a WhatsApp CTA and a "sell your property" form. There is no database and no paid APIs, so it costs almost nothing to run. Built with **Claude Code** as an AI copilot to show how SMEs can ship professional web products quickly.

---

## 🛠️ Stack
| Capa · Layer | Tecnología · Technology |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Estilos · Styling | Tailwind CSS v4 (tokens en `@theme`) |
| Animación · Animation | Framer Motion · Lenis |
| Mapa · Map | react-leaflet + OpenStreetMap |
| Iconos · Icons | lucide-react |
| Datos · Data | `src/data/propiedades.json` |

## 🚀 Correr localmente · Run locally
```bash
git clone https://github.com/1ntotheligh7/demo-inmobiliaria.git
cd demo-inmobiliaria
npm install
npm run dev   # http://localhost:3000
```

## 👤 Autor · Author
**Victor Hugo Rodríguez Vallejo** · AI Solutions Implementation Lead · [LinkedIn](https://www.linkedin.com/in/vrodriguezv)
