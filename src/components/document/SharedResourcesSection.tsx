import { DocumentSection } from "@/components/document/DocumentSection"
import { MermaidDiagram } from "@/components/ui/mermaid-diagram"

const THREE_CHANNELS_DIAGRAM = `flowchart LR
  subgraph Entrada["Fases 1 y 2: Lectura y Clasificación"]
    TXT["transmisiones.txt<br/>Lectura línea por línea"]
    EXT["Extractor con Pila<br/>PilaConBicola"]
    TXT --> EXT
  end

  subgraph Canales["3 Canales de Entrada (FIFO)"]
    C1["Canal 1<br/>ColaConBicola"]
    C2["Canal 2<br/>ColaConBicola"]
    C3["Canal 3<br/>ColaConBicola"]
  end

  EXT -->|"[1]"| C1
  EXT -->|"[2]"| C2
  EXT -->|"[3]"| C3

  RR{{"Despachador Round-Robin<br/>1 registro por turno: 1 -> 2 -> 3"}}

  C1 --> RR
  C2 --> RR
  C3 --> RR

  subgraph Maquinas["2 Máquinas Compartidas"]
    G["ColaGuardado<br/>AUDIO · IMAGEN · TEXTO"]
    D["ColaEliminados<br/>DESTRUIR"]
  end

  J["Anomalía INVERTIR<br/>Invierte ColaGuardado con Pila"]

  RR -->|"AUDIO / IMAGEN / TEXTO"| G
  RR -->|"DESTRUIR"| D
  RR -->|"INVERTIR"| J
  J -.->|"Reordena lote actual"| G

  style TXT fill:#14131A,stroke:#A69EB3,color:#F8F6FB
  style EXT fill:#231033,stroke:#DC47CA,color:#F8F6FB
  style C1 fill:#171429,stroke:#7256CE,color:#F8F6FB
  style C2 fill:#171429,stroke:#7256CE,color:#F8F6FB
  style C3 fill:#171429,stroke:#7256CE,color:#F8F6FB
  style RR fill:#2A0A38,stroke:#FC73A9,color:#FFFFFF
  style G fill:#1F0D2E,stroke:#DC47CA,color:#F8F6FB
  style D fill:#26141C,stroke:#F99A60,color:#F8F6FB
  style J fill:#2B1610,stroke:#F99A60,stroke-dasharray: 5 5,color:#F99A60`

export function SharedResourcesSection() {
  return (
    <DocumentSection id="el-problema" title="El Problema">
      <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
        La estación de inteligencia solo dispone de{" "}
        <strong className="font-semibold text-foreground">
          2 máquinas compartidas
        </strong>{" "}
        para procesar los paquetes provenientes de los{" "}
        <strong className="font-semibold text-foreground">
          3 canales de frecuencia
        </strong>
        . Al ser recursos compartidos, es estrictamente obligatorio modelar el
        acceso mediante{" "}
        <strong className="font-semibold text-foreground">colas</strong>:
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-l-2 border-vice-magenta/70 pl-4">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            Buffer de Guardado{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              ColaGuardado
            </code>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 sm:text-base">
            Recibe todos los paquetes útiles (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              AUDIO
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              IMAGEN
            </code>{" "}
            y{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              TEXTO
            </code>
            ) en orden cronológico.
          </p>
        </div>

        <div className="border-l-2 border-vice-orange/70 pl-4">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            Filtro de Descarte / Señuelos{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              ColaEliminados
            </code>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 sm:text-base">
            Recibe exclusivamente paquetes con operación{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              DESTRUIR
            </code>
            .
          </p>
        </div>
      </div>

      <div className="pt-2">
        <MermaidDiagram
          chart={THREE_CHANNELS_DIAGRAM}
          caption="Flujo concurrente: los 3 canales se despachan en turnos estrictos (1 → 2 → 3) hacia las 2 máquinas compartidas."
        />
      </div>
    </DocumentSection>
  )
}
