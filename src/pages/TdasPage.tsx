import { ArrowLeft, ExternalLink } from "lucide-react"
import type { AppRoute } from "@/components/document/AppBar"
import { Button } from "@/components/ui/button"

interface TdasPageProps {
  onBack: () => void
  onNavigate: (route: AppRoute) => void
}

interface TdaSpec {
  name: string
  file: string
  category: string
  accent: string
  summary: string
  membersLabel: string
  members: readonly string[]
  usage: string
  guideRoute?: AppRoute
  guideLabel?: string
}

const STRUCTURAL_TDAS: readonly TdaSpec[] = [
  {
    name: "Nodo<T>",
    file: "Nodo.cs (o clase interna en Bicola.cs)",
    category: "Estructura Auxiliar · Interno de Bicola<T>",
    accent: "border-vice-orange",
    summary:
      "Unidad básica doblemente enlazada que soporta internamente a Bicola<T>. Puede implementarse como clase interna privada dentro de Bicola.cs o en su propio archivo auxiliar Nodo.cs.",
    membersLabel: "Atributos obligatorios",
    members: [
      "Dato (T)",
      "Anterior (Nodo<T>?)",
      "Siguiente (Nodo<T>?)",
    ],
    usage:
      "Enlaza los elementos en ambas direcciones dentro de Bicola<T> para permitir inserciones, eliminaciones y rotaciones en O(1).",
  },
  {
    name: "Bicola<T>",
    file: "Bicola.cs",
    category: "Estructura Base · Doblemente Enlazada",
    accent: "border-vice-magenta",
    summary:
      "Estructura base implementada manualmente con nodos doblemente enlazados (Nodo<T> como clase interna o en Nodo.cs). Soporta inserción y eliminación en ambos extremos en O(1).",
    membersLabel: "Operaciones obligatorias",
    members: [
      "InsertarFrente(T valor)",
      "InsertarFinal(T valor)",
      "EliminarFrente() → T",
      "EliminarFinal() → T",
      "VerFrente() → T",
      "VerFinal() → T",
      "EstaVacia() → bool",
      "Cantidad → int",
      "Recorrer() / RecorrerInverso()",
    ],
    usage:
      "Base interna de PilaConBicola<T> y ColaConBicola<T>, y estructura principal del carrusel circular Bicola<Pagina> en Fases 5 y 6.",
  },
  {
    name: "PilaConBicola<T>",
    file: "PilaConBicola.cs",
    category: "TDA Genérico · LIFO",
    accent: "border-vice-indigo",
    summary:
      "Pila construida por composición delegando sus operaciones a una instancia privada de Bicola<T>, sin depender de Stack<T> de .NET.",
    membersLabel: "Operaciones obligatorias",
    members: [
      "Apilar(T valor)",
      "Desapilar() → T",
      "VerTope() → T",
      "EstaVacia() → bool",
      "Cantidad → int",
      "Recorrer()",
    ],
    usage:
      "Extractor de delimitadores (PilaConBicola<char>) en Fase 2, inversión de ColaGuardado (PilaConBicola<Registro>) ante comandos INVERTIR en Fase 3, y desencriptado de textos en Fase 5.",
  },
  {
    name: "ColaConBicola<T>",
    file: "ColaConBicola.cs",
    category: "TDA Genérico · FIFO",
    accent: "border-vice-pink",
    summary:
      "Cola construida por composición sobre Bicola<T> (encola por el final, desencola por el frente), sin depender de Queue<T> de .NET.",
    membersLabel: "Operaciones obligatorias",
    members: [
      "Encolar(T valor)",
      "Desencolar() → T",
      "VerFrente() → T",
      "EstaVacia() → bool",
      "Cantidad → int",
      "Recorrer()",
    ],
    usage:
      "Las 3 colas de entrada (canal1, canal2, canal3) en Fases 2 y 3, más las 2 máquinas compartidas (ColaGuardado y ColaEliminados) en Fases 3, 4 y 5.",
  },
] as const

const DOMAIN_TDAS: readonly TdaSpec[] = [
  {
    name: "Registro",
    file: "Registro.cs",
    category: "TDA de Dominio · Línea de Transmisión",
    accent: "border-vice-orange",
    summary:
      "Encapsula los 4 campos extraídos de cada línea de transmisiones.txt para transportarlos de forma tipada a través de las colas y pilas del pipeline.",
    membersLabel: "Atributos obligatorios",
    members: [
      "Id (int)",
      "Canal (int · 1..3)",
      "Operacion (string)",
      "Payload (string)",
    ],
    usage:
      "Elemento almacenado en canal1, canal2, canal3, ColaGuardado y ColaEliminados (Fases 2 a 5).",
  },
  {
    name: "Pagina",
    file: "Pagina.cs",
    category: "TDA de Dominio · Diapositiva Final",
    accent: "border-vice-magenta",
    summary:
      "Modela cada página lista para visualizar en el carrusel final, combinando la imagen vigente (System.Drawing.Image o Bitmap decodificado desde Base64 para PictureBox.Image) con el texto desencriptado.",
    membersLabel: "Atributos obligatorios",
    members: [
      "Numero (int)",
      "Imagen (System.Drawing.Image? · o Bitmap)",
      "Descripcion (string)",
    ],
    usage:
      "Elemento almacenado en Bicola<Pagina> en Fase 5 y rotado en el carrusel circular de la Fase 6.",
    guideRoute: "imagenes-base64",
    guideLabel: "Ver guía de Imágenes Base64 (System.Drawing.Image / Bitmap)",
  },
] as const

function TdaCard({
  tda,
  onNavigate,
}: {
  tda: TdaSpec
  onNavigate: (route: AppRoute) => void
}) {
  return (
    <article
      className={`border-l-[3px] ${tda.accent} bg-card/55 px-5 py-5 sm:px-6`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <h3 className="font-mono text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            {tda.name}
          </h3>
          <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {tda.file}
          </code>
        </div>
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {tda.category}
        </span>
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-foreground/85 sm:text-base">
        {tda.summary}
      </p>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {tda.membersLabel}
        </p>
        <ul className="flex flex-wrap gap-2">
          {tda.members.map((member) => (
            <li
              key={member}
              className="rounded border border-border/80 bg-background/70 px-2.5 py-1 font-mono text-xs text-foreground"
            >
              {member}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <strong className="font-semibold text-foreground/90">
          Uso en el pipeline:
        </strong>{" "}
        {tda.usage}
      </p>

      {tda.guideRoute && tda.guideLabel && (
        <a
          href={`#/${tda.guideRoute}`}
          onClick={(e) => {
            e.preventDefault()
            onNavigate(tda.guideRoute!)
          }}
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-vice-pink underline decoration-vice-pink/60 underline-offset-4 transition-colors hover:text-vice-orange sm:text-sm"
        >
          {tda.guideLabel}
          <ExternalLink className="size-3.5" />
        </a>
      )}
    </article>
  )
}

export function TdasPage({ onBack, onNavigate }: TdasPageProps) {
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
            Arquitectura de Datos · Unidad 1
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            TDAs básicos{" "}
            <span className="text-vice-pink">a implementar</span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Estos son los 5 Tipos de Datos Abstractos obligatorios (más la
            estructura auxiliar{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              Nodo&lt;T&gt;
            </code>
            ) que soportan las 6 fases del proyecto. Todos los TDAs
            estructurales deben programarse manualmente con{" "}
            <a
              href="#/generic-types"
              onClick={(e) => {
                e.preventDefault()
                onNavigate("generic-types")
              }}
              className="inline-flex items-baseline gap-1 font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange"
            >
              Generic Types (&lt;T&gt;)
              <ExternalLink className="size-3.5" />
            </a>{" "}
            y contar con recorrido no destructivo para visualizar su estado en
            pantalla.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            1. Estructuras de Datos (TDAs Genéricos)
          </h2>
          <div className="flex flex-col gap-5">
            {STRUCTURAL_TDAS.map((tda) => (
              <TdaCard key={tda.file} tda={tda} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            2. TDAs de Dominio (Entidades)
          </h2>
          <div className="flex flex-col gap-5">
            {DOMAIN_TDAS.map((tda) => (
              <TdaCard key={tda.file} tda={tda} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

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
