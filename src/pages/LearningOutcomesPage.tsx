import { ArrowLeft, ExternalLink } from "lucide-react"
import type { AppRoute } from "@/components/document/AppBar"
import { Button } from "@/components/ui/button"

interface LearningOutcomesPageProps {
  onBack: () => void
  onNavigate: (route: AppRoute) => void
}

interface LearningItem {
  title: string
  category: string
  description: string
  accent: string
  guideRoute?: AppRoute
  guideLabel?: string
}

const LEARNING_ITEMS: LearningItem[] = [
  {
    title: "Tipos de Datos Abstractos (TDAs) desde cero",
    category: "Estructuras de Datos",
    description:
      "Implementarás manualmente Bicola<T>, PilaConBicola<T> y ColaConBicola<T> manejando nodos y referencias sin depender de las colecciones nativas de .NET, además de recorridos para visualizar su contenido sin perder elementos.",
    accent: "border-vice-magenta",
  },
  {
    title: "Tipos de Datos Genéricos (<T>)",
    category: "Sistema de Tipos",
    description:
      "Aprenderás a parametrizar tus estructuras para reutilizar exactamente el mismo código con char, Registro y Pagina manteniendo seguridad de tipos en tiempo de compilación.",
    accent: "border-vice-orange",
    guideRoute: "generic-types",
    guideLabel: "Ver guía de Generic Types",
  },
  {
    title: "Programación Orientada a Objetos (POO)",
    category: "Paradigma",
    description:
      "Aplicarás encapsulamiento, modelado de entidades (Registro, Pagina), composición de clases (construir Pilas y Colas sobre una Bicola) y separación de responsabilidades por archivo y fase.",
    accent: "border-vice-indigo",
  },
  {
    title: "Programación Orientada a Eventos",
    category: "Paradigma",
    description:
      "Controlarás el flujo paso a paso mediante eventos de usuario: clics para avanzar entre fases, confirmaciones explícitas antes de destruir registros, navegación con flechas direccionales (← / →) y limpieza al cerrar la ventana (FormClosing).",
    accent: "border-vice-pink",
  },
  {
    title: "C# y .NET Windows Forms",
    category: "Desarrollo de Escritorio",
    description:
      "Construirás una aplicación de escritorio nativa en Windows sin librerías externas: manejo de controles (PictureBox, botones, visores de texto), ciclo de vida del formulario y liberación correcta de recursos gráficos (Dispose).",
    accent: "border-vice-magenta",
  },
  {
    title: "Manejo de Base64 e Imágenes en Memoria",
    category: "Datos Binarios",
    description:
      "Entenderás cómo representar archivos binarios en texto plano, decodificarlos con Convert.FromBase64String, cargarlos en RAM con MemoryStream y clonarlos a Bitmap para evitar bloqueos de GDI+ en Windows Forms.",
    accent: "border-vice-orange",
    guideRoute: "imagenes-base64",
    guideLabel: "Ver guía de Imágenes Base64",
  },
  {
    title: "Manejo de Audio e Interoperabilidad Nativa (P/Invoke)",
    category: "Multimedia y SO",
    description:
      "Decodificarás una pista MP3 desde Base64 a la carpeta temporal del sistema y la reproducirás en paralelo y en bucle invocando directamente la API nativa de Windows winmm.dll (mciSendString) con cero paquetes NuGet.",
    accent: "border-vice-indigo",
    guideRoute: "audio-base64",
    guideLabel: "Ver guía de Audio Base64",
  },
  {
    title: "Complejidad Algorítmica y StringBuilder",
    category: "Rendimiento",
    description:
      "Experimentarás el impacto real entre concatenar texto en O(n²) y usar un buffer mutable O(n) con StringBuilder al procesar millones de caracteres Base64 sin congelar la interfaz.",
    accent: "border-vice-pink",
    guideRoute: "string-builder",
    guideLabel: "Ver guía de StringBuilder",
  },
  {
    title: "Parsing y Validación de Delimitadores con Pilas",
    category: "Algoritmos",
    description:
      "Extraerás campos delimitados por (), [], <> y {} carácter por carácter usando una pila manual, aplicando el mismo principio que utilizan los compiladores e intérpretes para emparejar símbolos.",
    accent: "border-vice-magenta",
  },
  {
    title: "Planificación Round-Robin",
    category: "Sistemas y Colas",
    description:
      "Simularás un planificador por turnos estrictos (1 → 2 → 3) que alterna entre múltiples colas concurrentes y maneja eventos de inversión en tránsito (INVERTIR) usando una pila auxiliar.",
    accent: "border-vice-orange",
  },
  {
    title: "Navegación Circular sobre Bicolas",
    category: "Estructuras de Datos",
    description:
      "Implementarás un carrusel infinito rotando directamente los extremos de una Bicola<Pagina> (EliminarFrente → InsertarFinal y viceversa) sin recurrir a índices, arreglos ni List<T>.",
    accent: "border-vice-indigo",
  },
  {
    title: "Arquitectura en Pipeline (Etapas Desacopladas)",
    category: "Diseño de Software",
    description:
      "Organizarás un sistema complejo en 6 fases independientes con entradas y salidas bien definidas, facilitando la depuración paso a paso y el mantenimiento del código.",
    accent: "border-vice-pink",
  },
  {
    title: "Git, GitHub y Trabajo en Equipo",
    category: "Control de Versiones y Colaboración",
    description:
      "Gestionarás el historial real del proyecto con commits claros, ramas y sincronización remota en GitHub, coordinando responsabilidades por módulo y resolviendo cambios en conjunto como en un entorno profesional.",
    accent: "border-vice-magenta",
  },
]

export function LearningOutcomesPage({
  onBack,
  onNavigate,
}: LearningOutcomesPageProps) {
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
            Competencias Técnicas · Unidad 1
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            ¿Qué aprendes con{" "}
            <span className="text-vice-pink">este proyecto</span>?
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Más allá de implementar pilas, colas y bicolas en teoría, este
            proyecto integra fundamentos reales de ingeniería de software,
            sistemas operativos, rendimiento y desarrollo de aplicaciones de
            escritorio en C#.
          </p>
        </header>

        <ol className="flex flex-col gap-5">
          {LEARNING_ITEMS.map((item, index) => (
            <li
              key={item.title}
              className={`border-l-[3px] ${item.accent} bg-card/55 px-5 py-4 sm:px-6 sm:py-5`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  <span className="mr-2 font-mono text-sm font-semibold text-vice-orange">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {item.title}
                </h2>
                <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  {item.category}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {item.description}
              </p>
              {item.guideRoute && item.guideLabel && (
                <a
                  href={`#/${item.guideRoute}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate(item.guideRoute!)
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-vice-pink underline decoration-vice-pink/60 underline-offset-4 transition-colors hover:text-vice-orange sm:text-sm"
                >
                  {item.guideLabel}
                  <ExternalLink className="size-3.5" />
                </a>
              )}
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
