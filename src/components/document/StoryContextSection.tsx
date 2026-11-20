import { DocumentSection } from "@/components/document/DocumentSection"
import { FloatingVisual } from "@/components/document/FloatingVisual"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface StoryContextSectionProps {
  onOpenTransmissions: () => void
}

export function StoryContextSection({
  onOpenTransmissions,
}: StoryContextSectionProps) {
  return (
    <DocumentSection id="contexto-historia" title="Contexto de la Historia">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
          <p>
            <strong className="font-semibold text-foreground">Año 2026.</strong>{" "}
            Como analista de ciberinteligencia, interceptaste{" "}
            <button
              type="button"
              onClick={onOpenTransmissions}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink underline decoration-vice-pink/50 decoration-dotted underline-offset-4 transition-colors hover:bg-vice-deep/80 hover:text-vice-orange"
            >
              transmisiones.txt
            </button>
            : un expediente confidencial filtrado que oculta{" "}
            <strong className="font-semibold text-foreground">imágenes</strong>,{" "}
            <strong className="font-semibold text-foreground">
              reportes encriptados
            </strong>{" "}
            y una{" "}
            <strong className="font-semibold text-foreground">
              pista de audio
            </strong>
            . La señal llegó dividida en{" "}
            <strong className="font-semibold text-foreground">3 canales</strong>,
            contaminada con{" "}
            <strong className="font-semibold text-foreground">señuelos</strong> y
            alterada por{" "}
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="cursor-help font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange" />
                }
              >
                jammers
              </TooltipTrigger>
              <TooltipContent className="max-w-xs leading-snug">
                Dispositivos inhibidores de señal que interfieren una transmisión.
                En el archivo aparecen como comandos INVERTIR que voltean el orden
                actual de ColaGuardado.
              </TooltipContent>
            </Tooltip>{" "}
            que invierten el orden en tránsito.
          </p>

          <p>
            <strong className="font-semibold text-foreground">Tu misión:</strong>{" "}
            construir una app en{" "}
            <strong className="font-semibold text-foreground">
              C# (Windows Forms)
            </strong>{" "}
            que ejecute el descifrado{" "}
            <strong className="font-semibold text-foreground">
              etapa por etapa
            </strong>{" "}
            hasta revelar el expediente en un{" "}
            <strong className="font-semibold text-foreground">
              carrusel circular
            </strong>{" "}
            (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              Bicola&lt;Pagina&gt;
            </code>
            ) con audio en paralelo.
          </p>
        </div>

        <FloatingVisual
          src="./story-context.jpg"
          alt="Expediente confidencial interceptado"
          className="max-w-[360px] sm:max-w-[380px]"
          imageClassName="rounded-xl border border-border/80 shadow-2xl shadow-vice-deep/50"
          glowClassName="from-vice-orange/25 via-vice-magenta/20 to-transparent"
          tiltDirection={1}
        />
      </div>
    </DocumentSection>
  )
}
