import { Download, ExternalLink } from "lucide-react"
import { DocumentSection } from "@/components/document/DocumentSection"
import { PhaseBlock } from "@/components/document/PhaseBlock"
import {
  PHASE_2_DIAGRAM,
  PHASE_3_DIAGRAM,
  PHASE_5_DIAGRAM,
  PHASE_6_DIAGRAM,
} from "@/components/document/pipelineDiagrams"
import { MermaidDiagram } from "@/components/ui/mermaid-diagram"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PipelineSectionProps {
  onOpenStringBuilder: () => void
  onOpenImagesGuide: () => void
  onOpenAudioGuide: () => void
  onOpenTransmissions: () => void
}

const DELIMITERS = [
  {
    symbol: "()",
    field: "id",
    type: "int",
    example: "(101)",
    detail: "Identificador único del registro.",
  },
  {
    symbol: "[]",
    field: "canal",
    type: "int · 1..3",
    example: "[2]",
    detail: "Cola de canal destino (1, 2 o 3).",
  },
  {
    symbol: "<>",
    field: "operacion",
    type: "string",
    example: "<TEXTO>",
    detail: "AUDIO, IMAGEN, TEXTO, DESTRUIR o INVERTIR.",
  },
  {
    symbol: "{}",
    field: "payload",
    type: "string",
    example: "{.adinoeL...}",
    detail:
      "Base64 directo en AUDIO/IMAGEN, texto invertido en TEXTO/DESTRUIR, vacío en INVERTIR.",
  },
] as const

export function PipelineSection({
  onOpenStringBuilder,
  onOpenImagesGuide,
  onOpenAudioGuide,
  onOpenTransmissions,
}: PipelineSectionProps) {
  return (
    <DocumentSection
      id="pipeline-proyecto"
      title={
        <>
          <Tooltip>
            <TooltipTrigger
              render={
                <span className="cursor-help underline decoration-vice-orange/60 decoration-dotted underline-offset-6 hover:text-vice-pink" />
              }
            >
              Pipeline
            </TooltipTrigger>
            <TooltipContent className="max-w-xs leading-snug">
              Cadena secuencial de etapas donde la salida de una fase sirve
              directamente como entrada de la siguiente, manteniendo cada paso
              aislado y ordenado.
            </TooltipContent>
          </Tooltip>{" "}
          del Proyecto
        </>
      }
    >
      <div className="space-y-14">
        <PhaseBlock
          phase="Fase 1"
          name="FileReader"
          params="ruta"
          returns="string"
          accentClassName="border-vice-magenta/70"
        >
          <p>
            Lee el archivo único{" "}
            <button
              type="button"
              onClick={onOpenTransmissions}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink underline decoration-vice-pink/50 decoration-dotted underline-offset-4 transition-colors hover:bg-vice-deep/80 hover:text-vice-orange"
            >
              transmisiones.txt
            </button>{" "}
            y carga su contenido para pasarlo a la siguiente fase.
          </p>
          <div>
            <a
              href="./transmisiones.txt"
              download="transmisiones.txt"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-3.5 py-2 font-mono text-xs font-semibold text-vice-pink transition-colors hover:border-vice-pink/60 hover:text-vice-orange sm:text-sm"
            >
              <Download className="size-4" />
              Descargar archivo transmisiones.txt
            </a>
          </div>
          <p className="text-sm text-foreground/80 sm:text-base">
            <strong className="font-semibold text-foreground">
              Interacción obligatoria:
            </strong>{" "}
            La aplicación debe cargar el archivo{" "}
            <strong className="font-semibold text-foreground">
              solo al hacer clic
            </strong>{" "}
            y mostrar su contenido en pantalla antes de continuar.
          </p>
        </PhaseBlock>

        <PhaseBlock
          phase="Fase 2"
          name="FileProcessor"
          params="contenido"
          returns="(canal1, canal2, canal3)"
          accentClassName="border-vice-indigo/70"
        >
          <p>
            Recorre el archivo línea por línea, extrae cada{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              Registro
            </code>{" "}
            usando{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              PilaConBicola&lt;char&gt;
            </code>{" "}
            +{" "}
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="#/string-builder"
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenStringBuilder()
                    }}
                    className="inline-flex items-baseline font-mono text-sm font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange sm:text-base"
                  />
                }
              >
                StringBuilder
              </TooltipTrigger>
              <TooltipContent className="flex max-w-xs flex-col items-start gap-1.5 p-3 leading-snug">
                <span>
                  Buffer mutable de texto en C# (O(n)). Es obligatorio porque
                  concatenar strings con += sobre millones de caracteres Base64
                  congela la aplicación (O(n²)).
                </span>
                <a
                  href="#/string-builder"
                  onClick={(e) => {
                    e.preventDefault()
                    onOpenStringBuilder()
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-vice-deep underline underline-offset-2"
                >
                  Ver cómo funciona y ejemplos
                  <ExternalLink className="size-3" />
                </a>
              </TooltipContent>
            </Tooltip>{" "}
            y lo encola inmediatamente en su canal correspondiente (
            <strong className="font-semibold text-foreground">1, 2 o 3</strong>
            ).
          </p>

          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Delimitadores obligatorios por línea
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {DELIMITERS.map((item) => (
                <div
                  key={item.symbol}
                  className="rounded-lg border border-border bg-card/70 p-3.5 text-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-muted px-2 py-0.5 font-mono font-bold text-foreground">
                        {item.symbol}
                      </code>
                      <span className="font-mono font-semibold text-foreground">
                        {item.field}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        ({item.type})
                      </span>
                    </div>
                    <code className="font-mono text-xs text-muted-foreground">
                      {item.example}
                    </code>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="border-l-2 border-border bg-card/50 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <strong className="font-semibold text-foreground">
              Regla del extractor con pila:
            </strong>{" "}
            Al encontrar <code className="font-mono text-foreground">(</code>,{" "}
            <code className="font-mono text-foreground">[</code>,{" "}
            <code className="font-mono text-foreground">&lt;</code> o{" "}
            <code className="font-mono text-foreground">{"{"}</code>, apilarlo en{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              PilaConBicola&lt;char&gt;
            </code>{" "}
            y acumular los caracteres en{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              StringBuilder
            </code>{" "}
            hasta encontrar el cierre correspondiente{" "}
            <code className="font-mono text-foreground">)</code>,{" "}
            <code className="font-mono text-foreground">]</code>,{" "}
            <code className="font-mono text-foreground">&gt;</code> o{" "}
            <code className="font-mono text-foreground">{"}"}</code>, desapilarlo
            y asignar el campo.
          </p>

          <p className="text-sm text-foreground/80 sm:text-base">
            <strong className="font-semibold text-foreground">
              Interacción y visualización obligatoria:
            </strong>{" "}
            Al igual que en la Fase 1, este paso debe ejecutarse{" "}
            <strong className="font-semibold text-foreground">
              al hacer clic
            </strong>{" "}
            y mostrar en pantalla el contenido de las{" "}
            <strong className="font-semibold text-foreground">
              3 colas de canales
            </strong>{" "}
            (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              canal1
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              canal2
            </code>{" "}
            y{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              canal3
            </code>
            ). Para ello, debes implementar un método adicional en tus TDAs que
            permita{" "}
            <strong className="font-semibold text-foreground">
              recorrer y mostrar la bicola, la pila o la cola
            </strong>{" "}
            según corresponda, sin perder sus elementos.
          </p>

          <MermaidDiagram
            chart={PHASE_2_DIAGRAM}
            caption="Extracción carácter por carácter usando pila de delimitadores y StringBuilder."
          />
        </PhaseBlock>

        <PhaseBlock
          phase="Fase 3"
          name="RoundRobinSimulator"
          params="canal1, canal2, canal3"
          returns="(colaGuardado, colaEliminados)"
          accentClassName="border-vice-pink/70"
        >
          <p>
            Ejecuta un ciclo{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              while
            </code>{" "}
            hasta que los{" "}
            <strong className="font-semibold text-foreground">
              3 canales estén vacíos
            </strong>
            , desencolando exactamente{" "}
            <strong className="font-semibold text-foreground">
              1 registro por canal en orden estricto
            </strong>{" "}
            (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              1 → 2 → 3 → 1 → 2 → 3 ...
            </code>
            ):
          </p>

          <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <code className="font-mono font-semibold text-foreground">
                AUDIO
              </code>
              ,{" "}
              <code className="font-mono font-semibold text-foreground">
                IMAGEN
              </code>
              ,{" "}
              <code className="font-mono font-semibold text-foreground">
                TEXTO
              </code>{" "}
              → se encola en{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                colaGuardado
              </code>
              .
            </li>
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <code className="font-mono font-semibold text-foreground">
                DESTRUIR
              </code>{" "}
              → se encola en{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                colaEliminados
              </code>
              .
            </li>
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <code className="font-mono font-semibold text-foreground">
                INVERTIR
              </code>{" "}
              <span className="text-muted-foreground">(jammer)</span> → invierte
              el lote actual de{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                colaGuardado
              </code>{" "}
              (desencolar todo → apilar en{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                PilaConBicola&lt;Registro&gt;
              </code>{" "}
              → desapilar y volver a encolar) y se descarta el registro{" "}
              <code className="font-mono text-xs text-foreground">
                INVERTIR
              </code>
              .
            </li>
          </ul>

          <p className="border-l-2 border-destructive bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <strong className="font-semibold text-foreground">
              Regla estricta:
            </strong>{" "}
            Prohibido vaciar un canal completo antes de pasar al siguiente.
          </p>

          <MermaidDiagram
            chart={PHASE_3_DIAGRAM}
            caption="Despacho Round-Robin turno a turno e inversión de ColaGuardado al detectar INVERTIR."
          />
        </PhaseBlock>

        <PhaseBlock
          phase="Fase 4"
          name="Destroyer"
          params="colaEliminados"
          returns="string"
          accentClassName="border-vice-orange/70"
        >
          <p>
            Vacía{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              colaEliminados
            </code>{" "}
            y genera el reporte de registros descartados.
          </p>

          <p className="border-l-2 border-border bg-card/50 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <strong className="font-semibold text-foreground">
              Confirmación obligatoria:
            </strong>{" "}
            Primero deben mostrarse en pantalla cada uno de los registros en{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              colaEliminados
            </code>
            . La eliminación{" "}
            <strong className="font-semibold text-foreground">
              no debe ejecutarse directamente
            </strong>
            : el usuario debe{" "}
            <strong className="font-semibold text-foreground">
              aceptar / confirmar la destrucción
            </strong>{" "}
            para vaciar la cola y emitir el reporte.
          </p>
        </PhaseBlock>

        <PhaseBlock
          phase="Fase 5"
          name="StoryBuilder"
          params="colaGuardado"
          returns="(Bicola<Pagina>, audioBase64)"
          accentClassName="border-vice-magenta/70"
        >
          <p>
            Recorre{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              colaGuardado
            </code>{" "}
            en un solo ciclo{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              while (!colaGuardado.EstaVacia())
            </code>{" "}
            manteniendo{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              Image? imagenActual = null
            </code>{" "}
            y{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              string audioBase64 = &quot;&quot;
            </code>
            :
          </p>

          <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href="#/audio-base64"
                      onClick={(e) => {
                        e.preventDefault()
                        onOpenAudioGuide()
                      }}
                      className="inline-flex items-baseline gap-1 font-mono font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange"
                    />
                  }
                >
                  AUDIO
                </TooltipTrigger>
                <TooltipContent className="flex max-w-xs flex-col items-start gap-1.5 p-3 leading-snug">
                  <span>
                    Cómo decodificar texto Base64 a MP3, guardarlo en disco
                    temporal y reproducirlo en bucle sin NuGet.
                  </span>
                  <a
                    href="#/audio-base64"
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenAudioGuide()
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-vice-deep underline underline-offset-2"
                  >
                    Ver guía de Audio Base64
                    <ExternalLink className="size-3" />
                  </a>
                </TooltipContent>
              </Tooltip>{" "}
              → guarda{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                audioBase64 = reg.Payload
              </code>{" "}
              <a
                href="#/audio-base64"
                onClick={(e) => {
                  e.preventDefault()
                  onOpenAudioGuide()
                }}
                className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-vice-pink underline underline-offset-2 hover:text-vice-orange"
              >
                (ver cómo decodificar y guardar)
                <ExternalLink className="size-3" />
              </a>
              .
            </li>
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href="#/imagenes-base64"
                      onClick={(e) => {
                        e.preventDefault()
                        onOpenImagesGuide()
                      }}
                      className="inline-flex items-baseline gap-1 font-mono font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange"
                    />
                  }
                >
                  IMAGEN
                </TooltipTrigger>
                <TooltipContent className="flex max-w-xs flex-col items-start gap-1.5 p-3 leading-snug">
                  <span>
                    Cómo convertir texto Base64 a Bitmap en memoria, mostrarlo
                    en PictureBox y guardarlo en disco.
                  </span>
                  <a
                    href="#/imagenes-base64"
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenImagesGuide()
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-vice-deep underline underline-offset-2"
                  >
                    Ver guía de Imágenes Base64
                    <ExternalLink className="size-3" />
                  </a>
                </TooltipContent>
              </Tooltip>{" "}
              → decodifica Base64 a{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                Bitmap
              </code>{" "}
              (
              <code className="font-mono text-xs text-muted-foreground">
                Convert.FromBase64String → MemoryStream → new
                Bitmap(Image.FromStream(ms))
              </code>
              ) y actualiza{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                imagenActual
              </code>{" "}
              <a
                href="#/imagenes-base64"
                onClick={(e) => {
                  e.preventDefault()
                  onOpenImagesGuide()
                }}
                className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-vice-pink underline underline-offset-2 hover:text-vice-orange"
              >
                (ver cómo convertir y guardar)
                <ExternalLink className="size-3" />
              </a>
              .
            </li>
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <code className="font-mono font-semibold text-foreground">
                TEXTO
              </code>{" "}
              → desencripta{" "}
              <code className="font-mono text-xs text-foreground">
                reg.Payload
              </code>{" "}
              invirtiendo sus caracteres con{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                PilaConBicola&lt;char&gt;
              </code>{" "}
              +{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                StringBuilder
              </code>
              , crea{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                new Pagina(numero++, total, imagenActual, texto)
              </code>{" "}
              y la inserta con{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                bicolaPaginas.InsertarFinal(pagina)
              </code>
              .
            </li>
          </ul>

          <p className="border-l-2 border-border bg-card/50 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <strong className="font-semibold text-foreground">
              Importante:
            </strong>{" "}
            <strong className="font-semibold text-foreground">
              Solo se inserta una{" "}
              <code className="font-mono text-xs text-foreground">Pagina</code>{" "}
              en{" "}
              <code className="font-mono text-xs text-foreground">
                bicolaPaginas
              </code>{" "}
              cuando el registro es{" "}
              <code className="font-mono text-xs text-foreground">TEXTO</code>
            </strong>
            . Los registros{" "}
            <code className="font-mono text-xs text-foreground">IMAGEN</code>{" "}
            únicamente actualizan{" "}
            <code className="font-mono text-xs text-foreground">
              imagenActual
            </code>{" "}
            (no crean páginas) y{" "}
            <code className="font-mono text-xs text-foreground">AUDIO</code>{" "}
            únicamente almacena la pista de fondo.
          </p>

          <MermaidDiagram
            chart={PHASE_5_DIAGRAM}
            caption="Solo los registros TEXTO generan e insertan una Pagina en bicolaPaginas."
          />
        </PhaseBlock>

        <PhaseBlock
          phase="Fase 6"
          name="Carousel"
          params="bicolaPaginas, audioBase64"
          accentClassName="border-vice-indigo/70"
        >
          <p>
            Recibe únicamente{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              bicolaPaginas
            </code>{" "}
            y{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              audioBase64
            </code>
            . Muestra siempre{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              bicolaPaginas.VerFrente()
            </code>{" "}
            (imagen arriba, descripción abajo) y logra el efecto circular
            rotando directamente la bicola (sin índices ni{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              List&lt;T&gt;
            </code>
            ). Además de los botones en pantalla, debe permitir desplazarse de
            una página a otra utilizando las{" "}
            <strong className="font-semibold text-foreground">
              flechas direccionales del teclado
            </strong>{" "}
            (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              ←
            </code>{" "}
            /{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              →
            </code>
            ):
          </p>

          <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <strong className="font-mono font-semibold text-foreground">
                Siguiente &gt;
              </strong>
              :{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                EliminarFrente()
              </code>{" "}
              →{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                InsertarFinal()
              </code>{" "}
              → mostrar{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                VerFrente()
              </code>
              .
            </li>
            <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
              <strong className="font-mono font-semibold text-foreground">
                &lt; Anterior
              </strong>
              :{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                EliminarFinal()
              </code>{" "}
              →{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                InsertarFrente()
              </code>{" "}
              → mostrar{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                VerFrente()
              </code>
              .
            </li>
          </ul>

          <div className="border-l-2 border-border bg-card/50 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <p>
              <strong className="font-semibold text-foreground">
                Reproducción de audio en paralelo:
              </strong>{" "}
              El audio se reproduce en bucle sin paquetes NuGet (compatible
              desde{" "}
              <code className="font-mono text-xs text-foreground">
                .NET Framework 4.x
              </code>{" "}
              hasta{" "}
              <code className="font-mono text-xs text-foreground">.NET 10</code>
              ) y debe detenerse siempre en el evento{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                FormClosing
              </code>
              .
            </p>
            <a
              href="#/audio-base64"
              onClick={(e) => {
                e.preventDefault()
                onOpenAudioGuide()
              }}
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-vice-pink underline decoration-vice-pink/60 underline-offset-4 transition-colors hover:text-vice-orange sm:text-sm"
            >
              Ver código de ejemplo: AudioPlayer.cs y FormClosing
              <ExternalLink className="size-3.5" />
            </a>
          </div>

          <MermaidDiagram
            chart={PHASE_6_DIAGRAM}
            caption="Rotación circular directa sobre Bicola<Pagina> sin índices ni List<T>."
          />
        </PhaseBlock>
      </div>
    </DocumentSection>
  )
}
