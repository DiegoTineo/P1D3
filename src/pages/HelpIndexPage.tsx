import { ArrowLeft, ArrowRight } from "lucide-react"
import type { AppRoute } from "@/components/document/AppBar"
import { Button } from "@/components/ui/button"

interface HelpIndexPageProps {
  onBack: () => void
  onNavigate: (route: AppRoute) => void
}

interface HelpGuideItem {
  route: AppRoute
  href: string
  tag: string
  title: string
  description: string
  accent: string
}

const HELP_GUIDES: HelpGuideItem[] = [
  {
    route: "leer-archivo",
    href: "#/leer-archivo",
    tag: "Fase 1 · System.IO",
    title: "Cómo leer un archivo en C#",
    description:
      "Abrir transmisiones.txt con OpenFileDialog o desde AppContext.BaseDirectory y construir una vista previa segura sin congelar el TextBox.",
    accent: "border-vice-magenta",
  },
  {
    route: "generic-types",
    href: "#/generic-types",
    tag: "Arquitectura · TDAs",
    title: "Generic Types (<T>) en C#",
    description:
      "Cómo parametrizar Bicola<T>, PilaConBicola<T> y ColaConBicola<T> para reutilizar el mismo código con char, Registro y Pagina.",
    accent: "border-vice-indigo",
  },
  {
    route: "string-builder",
    href: "#/string-builder",
    tag: "Fase 2 y 5 · Rendimiento",
    title: "StringBuilder y complejidad O(n)",
    description:
      "Por qué concatenar strings con += congela la app al procesar millones de caracteres Base64 y cómo usar StringBuilder correctamente.",
    accent: "border-vice-pink",
  },
  {
    route: "imagenes-base64",
    href: "#/imagenes-base64",
    tag: "Fase 5 · Imágenes",
    title: "De texto Base64 a Imagen (Bitmap)",
    description:
      "Decodificar Base64 a MemoryStream, clonar a Bitmap para evitar errores de GDI+, mostrar en PictureBox, guardar en disco y liberar con Dispose.",
    accent: "border-vice-orange",
  },
  {
    route: "audio-base64",
    href: "#/audio-base64",
    tag: "Fase 5 y 6 · Audio",
    title: "De texto Base64 a Audio MP3 (sin NuGet)",
    description:
      "Guardar el MP3 decodificado en la carpeta temporal del sistema, reproducirlo en bucle con winmm.dll (AudioPlayer.cs) y detenerlo en FormClosing.",
    accent: "border-vice-magenta",
  },
]

export function HelpIndexPage({ onBack, onNavigate }: HelpIndexPageProps) {
  return (
    <div className="min-h-svh bg-background text-foreground selection:bg-vice-magenta/40 selection:text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 sm:py-14">
        <div>
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="gap-2 pl-0 text-muted-foreground hover:bg-transparent hover:text-vice-pink"
          >
            <ArrowLeft className="size-4" />
            Volver al enunciado del proyecto
          </Button>
        </div>

        <header className="space-y-4 border-b border-border pb-6">
          <p className="text-xs font-bold tracking-[0.2em] text-vice-orange uppercase sm:text-sm">
            Centro de Guías Técnicas · C# Windows Forms
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            <span className="text-vice-pink">Ayuda</span> y Material de Apoyo
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Índice centralizado con todas las guías prácticas y ejemplos de
            código en C# necesarios para completar cada fase del proyecto sin
            paquetes externos.
          </p>
        </header>

        <ol className="flex flex-col gap-4">
          {HELP_GUIDES.map((guide, index) => (
            <li key={guide.route}>
              <a
                href={guide.href}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(guide.route)
                }}
                className={`group flex flex-col gap-2 border-l-[3px] ${guide.accent} bg-card/55 px-5 py-4 transition-colors hover:bg-card sm:px-6 sm:py-5`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-vice-pink sm:text-xl">
                    <span className="mr-2 font-mono text-sm font-semibold text-vice-orange">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    {guide.title}
                  </h2>
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    {guide.tag}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {guide.description}
                </p>

                <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-vice-pink transition-colors group-hover:text-vice-orange sm:text-sm">
                  Abrir guía con ejemplos
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="border-t border-border pt-6">
          <Button type="button" onClick={onBack} className="gap-2">
            <ArrowLeft className="size-4" />
            Volver al proyecto
          </Button>
        </div>
      </div>
    </div>
  )
}
