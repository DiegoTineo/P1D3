import { DocumentSection } from "@/components/document/DocumentSection"
import { SectionBackdrop } from "@/components/document/SectionBackdrop"

const DESTRUCTIVE_CALLOUT_CLASS =
  "border-l-2 border-destructive bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base"

const DELIVERY_CHANNELS = [
  {
    src: "./icon-youtube.png",
    alt: "YouTube",
    title: "YouTube / Drive",
    subtitle: "Video de defensa y ejecución (máx. 20 min)",
  },
  {
    src: "./icon-github.png",
    alt: "GitHub",
    title: "GitHub",
    subtitle: "Repositorio público con el código fuente",
  },
  {
    src: "./icon-classroom.png",
    alt: "Google Classroom",
    title: "Google Classroom",
    subtitle: "Entrega oficial de ambos enlaces",
  },
] as const

export function DeliverySection() {
  return (
    <SectionBackdrop src="./delivery-bg.jpg">
      <DocumentSection id="formato-entrega" title="Formato de Entrega">
      <div className="space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
        <div className="grid gap-3 sm:grid-cols-3">
          {DELIVERY_CHANNELS.map((channel) => (
            <div
              key={channel.title}
              className="flex items-center gap-3.5 rounded-lg border border-border/80 bg-card/70 px-4 py-3 backdrop-blur-sm"
            >
              <img
                src={channel.src}
                alt={channel.alt}
                loading="lazy"
                className="size-10 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {channel.title}
                </p>
                <p className="text-xs leading-snug text-muted-foreground">
                  {channel.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p>
          La entrega se realiza en{" "}
          <strong className="font-semibold text-foreground">
            Google Classroom
          </strong>{" "}
          adjuntando el enlace a un{" "}
          <strong className="font-semibold text-foreground">
            video demostrativo subido a YouTube o Google Drive
          </strong>{" "}
          (tope máximo:{" "}
          <strong className="font-semibold text-foreground">20 minutos</strong>)
          acompañado del enlace al{" "}
          <strong className="font-semibold text-foreground">
            repositorio de GitHub
          </strong>{" "}
          con el código fuente. El video debe incluir obligatoriamente:
        </p>

        <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85 sm:text-base">
          <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
            <strong className="font-semibold text-foreground">
              Corrida en frío y defensa / explicación del código (ambos
              integrantes):
            </strong>{" "}
            recorrido técnico de tus TDAs manuales, extractor con pila,
            simulación Round-Robin y construcción del carrusel.{" "}
            <strong className="font-semibold text-foreground">
              Ambos integrantes de la pareja deben participar activamente en el
              video.
            </strong>
          </li>
          <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
            <strong className="font-semibold text-foreground">
              Demostración de la ejecución del proyecto:
            </strong>{" "}
            flujo completo etapa por etapa (lectura, 3 canales, Round-Robin,
            confirmación de eliminados y carrusel circular con navegación por
            botones/flechas y audio en paralelo).
          </li>
          <li className={DESTRUCTIVE_CALLOUT_CLASS}>
            <strong className="font-semibold text-foreground">
              Prohibido subir archivos{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                .exe
              </code>
              :
            </strong>{" "}
            el repositorio de GitHub debe contener únicamente código fuente y
            archivos del proyecto (sin ejecutables ni carpetas compiladas como{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              bin/
            </code>{" "}
            u{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              obj/
            </code>
            ; utiliza un{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              .gitignore
            </code>
            ).
          </li>
        </ul>

        <div className={DESTRUCTIVE_CALLOUT_CLASS}>
          <strong className="font-semibold text-foreground">
            Política de entregas demoradas:
          </strong>{" "}
          Pasadas las{" "}
          <strong className="font-semibold text-foreground">12:00 PM</strong> se
          resta{" "}
          <strong className="font-semibold text-foreground">
            1 punto por cada día de retraso
          </strong>
          , con un tope máximo de{" "}
          <strong className="font-semibold text-foreground">
            4 días (-4 puntos)
          </strong>
          ; superado ese límite de tolerancia, la calificación es directamente{" "}
          <strong className="font-semibold text-foreground">0</strong>. Se tomará
          en cuenta tanto la{" "}
          <strong className="font-semibold text-foreground">
            fecha de subida del video
          </strong>{" "}
          como la{" "}
          <strong className="font-semibold text-foreground">
            fecha de los commits en el repositorio de GitHub
          </strong>
          .
        </div>
      </div>
      </DocumentSection>
    </SectionBackdrop>
  )
}
