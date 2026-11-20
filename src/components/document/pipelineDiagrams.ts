export const PHASE_2_DIAGRAM = `flowchart LR
  L["Leer carácter<br/>de la línea"] --> A{"¿Apertura<br/>( [ < { ?"}
  A -->|"Sí"| P["Apilar símbolo<br/>PilaConBicola"]
  P --> B["Acumular chars<br/>en StringBuilder"]
  A -->|"No"| B
  B --> C{"¿Cierre<br/>correspondiente?"}
  C -->|"Sí"| D["Desapilar y<br/>asignar campo"]
  D --> E["Encolar Registro en<br/>Canal 1, 2 o 3"]

  style L fill:#14131A,stroke:#A69EB3,color:#F8F6FB
  style A fill:#171429,stroke:#7256CE,color:#F8F6FB
  style P fill:#231033,stroke:#DC47CA,color:#F8F6FB
  style B fill:#171429,stroke:#7256CE,color:#F8F6FB
  style C fill:#2A0A38,stroke:#FC73A9,color:#FFFFFF
  style D fill:#1F0D2E,stroke:#DC47CA,color:#F8F6FB
  style E fill:#26141C,stroke:#F99A60,color:#F8F6FB`

export const PHASE_3_DIAGRAM = `flowchart LR
  W["Turno estricto<br/>1 -> 2 -> 3"] --> OP{"¿Operación del<br/>registro?"}
  OP -->|"AUDIO / IMAGEN / TEXTO"| CG["Encolar en<br/>ColaGuardado"]
  OP -->|"DESTRUIR"| CE["Encolar en<br/>ColaEliminados"]
  OP -->|"INVERTIR (jammer)"| INV["Voltear ColaGuardado<br/>con PilaConBicola"]
  INV -.->|"Reencolar invertido<br/>y descartar INVERTIR"| CG

  style W fill:#2A0A38,stroke:#FC73A9,color:#FFFFFF
  style OP fill:#171429,stroke:#7256CE,color:#F8F6FB
  style CG fill:#1F0D2E,stroke:#DC47CA,color:#F8F6FB
  style CE fill:#26141C,stroke:#F99A60,color:#F8F6FB
  style INV fill:#2B1610,stroke:#F99A60,stroke-dasharray: 5 5,color:#F99A60`

export const PHASE_5_DIAGRAM = `flowchart LR
  Q["Desencolar de<br/>ColaGuardado"] --> T{"¿Operación?"}
  T -->|"AUDIO"| A["audioBase64 = Payload<br/>No crea página"]
  T -->|"IMAGEN"| I["Base64 -> Bitmap<br/>Actualiza imagenActual<br/>No crea página"]
  T -->|"TEXTO"| X["Invertir texto con<br/>Pila + StringBuilder"]
  X --> P["Crear Pagina con<br/>imagenActual + texto"]
  P --> B["bicolaPaginas<br/>InsertarFinal(pagina)"]

  style Q fill:#14131A,stroke:#A69EB3,color:#F8F6FB
  style T fill:#171429,stroke:#7256CE,color:#F8F6FB
  style A fill:#171429,stroke:#7256CE,color:#F8F6FB
  style I fill:#26141C,stroke:#F99A60,color:#F8F6FB
  style X fill:#231033,stroke:#DC47CA,color:#F8F6FB
  style P fill:#1F0D2E,stroke:#DC47CA,color:#F8F6FB
  style B fill:#2A0A38,stroke:#FC73A9,color:#FFFFFF`

export const PHASE_6_DIAGRAM = `flowchart LR
  V["VerFrente()<br/>Imagen arriba · Texto abajo"]
  V -->|"Siguiente o tecla →"| NF["EliminarFrente()"]
  NF --> NI["InsertarFinal()"]
  NI --> V

  V -->|"Anterior o tecla ←"| PF["EliminarFinal()"]
  PF --> PI["InsertarFrente()"]
  PI --> V

  style V fill:#2A0A38,stroke:#FC73A9,color:#FFFFFF
  style NF fill:#1F0D2E,stroke:#DC47CA,color:#F8F6FB
  style NI fill:#1F0D2E,stroke:#DC47CA,color:#F8F6FB
  style PF fill:#171429,stroke:#7256CE,color:#F8F6FB
  style PI fill:#171429,stroke:#7256CE,color:#F8F6FB`
