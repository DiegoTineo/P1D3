import { DocumentSection } from "@/components/document/DocumentSection"

export function DeliverySection() {
  return (
    <DocumentSection id="formato-entrega" title="Formato de Entrega">
      <div className="space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
        <p>
          La entrega consiste en un{" "}
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
              Corrida en frío y defensa / explicación del código:
            </strong>{" "}
            recorrido técnico de tus TDAs manuales, extractor con pila,
            simulación Round-Robin y construcción del carrusel.
          </li>
          <li className="border-l-2 border-border bg-card/60 px-4 py-2.5">
            <strong className="font-semibold text-foreground">
              Demostración de la ejecución del proyecto:
            </strong>{" "}
            flujo completo etapa por etapa (lectura, 3 canales, Round-Robin,
            confirmación de eliminados y carrusel circular con navegación por
            botones/flechas y audio en paralelo).
          </li>
          <li className="border-l-2 border-destructive/70 bg-card/60 px-4 py-2.5">
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

        <div className="border-l-2 border-destructive bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
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
          . Se tomará en cuenta tanto la{" "}
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
  )
}
