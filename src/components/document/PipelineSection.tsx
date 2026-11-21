import { Download, ExternalLink } from "lucide-react"
import {
  FaArrowsRotate,
  FaBookOpen,
  FaEye,
  FaFileLines,
  FaImages,
  FaTrashCan,
} from "react-icons/fa6"
import { GiStack } from "react-icons/gi"
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

function RegistroTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <code className="cursor-help rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange" />
        }
      >
        Registro
      </TooltipTrigger>
      <TooltipContent className="max-w-xs space-y-1.5 p-3 leading-snug">
        <p className="font-mono text-xs font-semibold">TDA Registro (Registro.cs)</p>
        <ul className="space-y-1 text-xs">
          <li>
            <code className="font-mono font-semibold">Id</code> (int): identificador único.
          </li>
          <li>
            <code className="font-mono font-semibold">Canal</code> (int): canal destino (1, 2 o 3).
          </li>
          <li>
            <code className="font-mono font-semibold">Operacion</code> (string): AUDIO, IMAGEN, TEXTO, DESTRUIR o INVERTIR.
          </li>
          <li>
            <code className="font-mono font-semibold">Payload</code> (string): Base64, texto invertido o vacío.
          </li>
        </ul>
      </TooltipContent>
    </Tooltip>
  )
}

function PaginaTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <code className="cursor-help rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold text-vice-pink underline decoration-vice-pink/60 decoration-dotted underline-offset-4 hover:text-vice-orange" />
        }
      >
        Pagina
      </TooltipTrigger>
      <TooltipContent className="max-w-xs space-y-1.5 p-3 leading-snug">
        <p className="font-mono text-xs font-semibold">TDA Pagina (Pagina.cs)</p>
        <ul className="space-y-1 text-xs">
          <li>
            <code className="font-mono font-semibold">Numero</code> (int): índice de la página (1..N).
          </li>
          <li>
            <code className="font-mono font-semibold">Imagen</code> (System.Drawing.Image? o Bitmap): referencia a <code className="font-mono">imagenActual</code> para PictureBox.
          </li>
          <li>
            <code className="font-mono font-semibold">Descripcion</code> (string): texto ya desencriptado.
          </li>
        </ul>
      </TooltipContent>
    </Tooltip>
  )
}

interface PipelineSectionProps {
  onOpenReadFileGuide: () => void
  onOpenStringBuilder: () => void
  onOpenImagesGuide: () => void
  onOpenAudioGuide: () => void
  onOpenTransmissions: () => void
  onOpenTdas: () => void
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
  onOpenReadFileGuide,
  onOpenStringBuilder,
  onOpenImagesGuide,
  onOpenAudioGuide,
  onOpenTransmissions,
  onOpenTdas,
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
      <div className="space-y-24 sm:space-y-28">
        <PhaseBlock
          phase="Fase 1"
          name="FileReader"
          params="ruta"
          returns="string"
          tone="pink"
          icon={FaFileLines}
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
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="./transmisiones.txt"
              download="transmisiones.txt"
              className="inline-flex items-center gap-3 rounded-lg border border-vice-pink/50 bg-vice-deep/45 px-6 py-3.5 font-mono text-sm font-semibold text-vice-pink shadow-lg shadow-vice-magenta/15 transition-all hover:border-vice-orange hover:bg-vice-deep/75 hover:text-vice-orange sm:text-base"
            >
              <Download className="size-5 shrink-0" />
              Descargar archivo transmisiones.txt
            </a>

            <a
              href="#/leer-archivo"
              onClick={(e) => {
                e.preventDefault()
                onOpenReadFileGuide()
              }}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-vice-pink underline decoration-vice-pink/60 underline-offset-4 transition-colors hover:text-vice-orange sm:text-sm"
            >
              ¿Cómo leer un archivo en C#?
              <ExternalLink className="size-3.5" />
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
            y mostrar su contenido en pantalla antes de continuar.{" "}
            <strong className="font-semibold text-foreground">
              No imprimas el payload Base64 completo
            </strong>{" "}
            en un{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              TextBox
            </code>{" "}
            o{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              ListBox
            </code>{" "}
            (pesa varios MB y congela la interfaz): trunca cada línea larga a una
            vista previa corta (ej. primeros 40–80 caracteres y su longitud).
          </p>
        </PhaseBlock>

        <PhaseBlock
          phase="Fase 2"
          name="ChannelEnqueuer"
          params="contenido"
          returns="(canal1, canal2, canal3)"
          tone="purple"
          icon={GiStack}
        >
          <p>
            Recorre el archivo línea por línea, extrae cada{" "}
            <RegistroTooltip />{" "}
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
              TDA Registro (Registro.cs) y delimitadores obligatorios por línea
            </p>
            <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
              Debes definir el TDA{" "}
              <RegistroTooltip />{" "}
              en su propio archivo{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground sm:text-sm">
                Registro.cs
              </code>{" "}
              para encapsular los 4 campos extraídos de cada línea (
              <code className="font-mono text-xs text-foreground">Id</code>,{" "}
              <code className="font-mono text-xs text-foreground">Canal</code>,{" "}
              <code className="font-mono text-xs text-foreground">Operacion</code>{" "}
              y <code className="font-mono text-xs text-foreground">Payload</code>
              ).
            </p>
            <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
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
              </code>{" "}
              son 3 instancias de{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                ColaConBicola&lt;Registro&gt;
              </code>{" "}
              que almacenan exactamente el mismo TDA{" "}
              <code className="font-mono text-xs text-foreground">Registro</code>;
              lo único que cambia es el canal destino (
              <strong className="font-semibold text-foreground">1, 2 o 3</strong>
              ) donde se encola cada instancia.
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
          tone="pink"
          icon={FaArrowsRotate}
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
            ). Si un canal se vacía primero que el resto, cuando sea su turno se
            salta directamente al siguiente:
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

          <p className="text-sm text-foreground/80 sm:text-base">
            <strong className="font-semibold text-foreground">
              Interacción y visualización obligatoria:
            </strong>{" "}
            Esta fase debe ejecutarse{" "}
            <strong className="font-semibold text-foreground">
              al hacer clic
            </strong>{" "}
            y mostrar en pantalla el contenido resultante de{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              colaGuardado
            </code>{" "}
            y{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              colaEliminados
            </code>{" "}
            antes de pasar a la Fase 4.
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
          tone="purple"
          icon={FaTrashCan}
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
          tone="pink"
          icon={FaBookOpen}
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
            manteniendo dos variables de estado vigentes durante el recorrido:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              Image? imagenActual = null
            </code>{" "}
            y{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              string audioBase64 = &quot;&quot;
            </code>
            :
          </p>

          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Cómo usar el estado vigente y armar el TDA Pagina (Pagina.cs)
            </p>
            <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
              Define el TDA <PaginaTooltip /> en su propio archivo{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground sm:text-sm">
                Pagina.cs
              </code>{" "}
              con los atributos{" "}
              <code className="font-mono text-xs text-foreground">Numero</code>{" "}
              (<code className="font-mono text-xs text-muted-foreground">int</code>),{" "}
              <code className="font-mono text-xs text-foreground">Imagen</code>{" "}
              (<code className="font-mono text-xs text-muted-foreground">System.Drawing.Image?</code>) y{" "}
              <code className="font-mono text-xs text-foreground">Descripcion</code>{" "}
              (<code className="font-mono text-xs text-muted-foreground">string</code>).
              El total de páginas se obtiene directamente desde{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
                bicolaPaginas.Cantidad
              </code>
              .
            </p>
            <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
              <strong className="font-semibold text-foreground">
                Patrón de estado actual:
              </strong>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
                imagenActual
              </code>{" "}
              conserva la última imagen decodificada; cada registro{" "}
              <code className="font-mono text-xs text-foreground">TEXTO</code>{" "}
              reutiliza esa misma{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
                imagenActual
              </code>{" "}
              al construir su <PaginaTooltip /> hasta que llegue un nuevo registro{" "}
              <code className="font-mono text-xs text-foreground">IMAGEN</code>{" "}
              que la reemplace. Por su parte,{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
                audioBase64
              </code>{" "}
              conserva la pista de fondo global del expediente fuera de{" "}
              <code className="font-mono text-xs text-foreground">Pagina</code>{" "}
              para devolverla junto con{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
                Bicola&lt;Pagina&gt;
              </code>{" "}
              y reproducirla en la Fase 6.
            </p>
          </div>

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
                new Pagina(numero++, imagenActual, texto)
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
          tone="purple"
          icon={FaImages}
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

      <div className="mt-14 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
        <div className="relative flex shrink-0 items-center justify-center p-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-radial from-[#2DD4BF]/25 via-[#1B312E]/35 to-transparent blur-2xl"
          />
          <FaEye
            aria-hidden="true"
            className="animate-float-slow relative size-14 text-[#43B8A9] drop-shadow-[0_10px_24px_rgba(45,212,191,0.35)] sm:size-20"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-4 border-l-2 border-[#43B8A9] bg-[#1B312E]/45 px-5 py-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground sm:text-base">
              TDAs básicos a implementar
            </p>
            <p className="text-xs leading-relaxed text-foreground/75 sm:text-sm">
              Consulta el resumen de los 5 TDAs obligatorios (
              <code className="font-mono text-foreground">Bicola&lt;T&gt;</code>,{" "}
              <code className="font-mono text-foreground">PilaConBicola&lt;T&gt;</code>,{" "}
              <code className="font-mono text-foreground">ColaConBicola&lt;T&gt;</code>,{" "}
              <code className="font-mono text-foreground">Registro</code> y{" "}
              <code className="font-mono text-foreground">Pagina</code>) con sus
              operaciones y atributos.
            </p>
          </div>

          <a
            href="#/tdas"
            onClick={(e) => {
              e.preventDefault()
              onOpenTdas()
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#43B8A9]/55 bg-[#1B312E]/85 px-4 py-2 font-mono text-xs font-semibold text-[#7CE8DA] transition-colors hover:border-[#6EE7D8] hover:bg-[#223E3A] hover:text-white sm:text-sm"
          >
            Ver TDAs a implementar
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </DocumentSection>
  )
}
