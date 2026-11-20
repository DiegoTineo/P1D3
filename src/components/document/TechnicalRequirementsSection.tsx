import { ExternalLink } from "lucide-react"
import { DocumentSection } from "@/components/document/DocumentSection"
import { FloatingVisual } from "@/components/document/FloatingVisual"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TDA_FILES = [
  "Bicola.cs",
  "PilaConBicola.cs",
  "ColaConBicola.cs",
] as const

interface TechnicalRequirementsSectionProps {
  onOpenGenericTypes: () => void
}

export function TechnicalRequirementsSection({
  onOpenGenericTypes,
}: TechnicalRequirementsSectionProps) {
  return (
    <DocumentSection
      id="requisitos-tecnicos"
      title="Requisitos Técnicos y Arquitectura Obligatoria"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
          <p>
            <strong className="font-semibold text-foreground">
              Lenguaje y entorno:
            </strong>{" "}
            <strong className="font-semibold text-foreground">
              C# con Windows Forms
            </strong>{" "}
            (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              .NET
            </code>
            ), sin instalar paquetes NuGet externos.
          </p>

          <div className="border-l-2 border-destructive bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <strong className="font-semibold text-foreground">
              Prohibido usar estructuras preconstruidas de .NET:
            </strong>{" "}
            No se permite importar ni utilizar{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              Stack&lt;T&gt;
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              Queue&lt;T&gt;
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              LinkedList&lt;T&gt;
            </code>{" "}
            (de{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
              System.Collections.Generic
            </code>
            ),{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              Stack
            </code>{" "}
            /{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              Queue
            </code>{" "}
            (de{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
              System.Collections
            </code>
            ) ni sus variantes en{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
              System.Collections.Concurrent
            </code>
            .{" "}
            <strong className="font-semibold text-foreground">
              Debes implementar cada TDA desde cero manualmente.
            </strong>
          </div>

          <div className="space-y-3">
            <p>
              <strong className="font-semibold text-foreground">
                Tipos de Datos Abstractos (TDA):
              </strong>{" "}
              Cada TDA debe estar implementado manualmente en su propio archivo
              utilizando{" "}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href="#/generic-types"
                      onClick={(e) => {
                        e.preventDefault()
                        onOpenGenericTypes()
                      }}
                      className="inline-flex items-baseline gap-1 font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange"
                    />
                  }
                >
                  Generic Types (
                  <code className="font-mono text-sm">&lt;T&gt;</code>)
                </TooltipTrigger>
                <TooltipContent className="flex max-w-xs flex-col items-start gap-1.5 p-3 leading-snug">
                  <span>
                    Permiten escribir una clase parametrizada por tipo (T) para
                    reutilizar tus TDAs con char, Registro y Pagina sin duplicar
                    código.
                  </span>
                  <a
                    href="#/generic-types"
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenGenericTypes()
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-vice-deep underline underline-offset-2"
                  >
                    Ver guía con ejemplos
                    <ExternalLink className="size-3" />
                  </a>
                </TooltipContent>
              </Tooltip>
              :
            </p>

            <ul className="flex max-w-md flex-col gap-2.5 pt-1">
              {TDA_FILES.map((fileName) => (
                <li
                  key={fileName}
                  className="border-l-2 border-vice-magenta bg-card/70 px-4 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:bg-card sm:text-base"
                >
                  {fileName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FloatingVisual
          src="./csharp-logo.png"
          alt="Logo de C# (.NET)"
          className="max-w-[210px] sm:max-w-[240px]"
          animationClassName="animate-breathe-slow"
          imageClassName="drop-shadow-[0_14px_32px_rgba(114,86,206,0.35)]"
          glowClassName="from-vice-indigo/30 via-vice-magenta/15 to-transparent"
          tiltDirection={-1}
        />
      </div>
    </DocumentSection>
  )
}
