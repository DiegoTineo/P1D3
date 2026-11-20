import { useEffect, useId, useState } from "react"
import mermaid from "mermaid"
import { useScrollFade } from "@/hooks/useScrollFade"

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

let isMermaidInitialized = false

function ensureMermaidInitialized() {
  if (isMermaidInitialized) {
    return
  }

  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    fontFamily: "Inter Variable, sans-serif",
    themeVariables: {
      darkMode: true,
      background: "#09090B",
      primaryColor: "#1F0D2E",
      primaryTextColor: "#F8F6FB",
      primaryBorderColor: "#DC47CA",
      secondaryColor: "#171429",
      secondaryTextColor: "#F8F6FB",
      secondaryBorderColor: "#7256CE",
      tertiaryColor: "#26141C",
      tertiaryTextColor: "#F8F6FB",
      tertiaryBorderColor: "#F99A60",
      lineColor: "#FC73A9",
      edgeLabelBackground: "#111015",
      clusterBkg: "#111015",
      clusterBorder: "#420452",
      fontSize: "14px",
    },
  })

  isMermaidInitialized = true
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const ref = useScrollFade<HTMLElement>()
  const reactId = useId().replace(/:/g, "")
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ensureMermaidInitialized()

    mermaid
      .render(`mermaid-${reactId}`, chart)
      .then(({ svg: renderedSvg }) => {
        if (!cancelled) {
          setSvg(renderedSvg)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Error al renderizar diagrama"
          )
        }
      })

    return () => {
      cancelled = true
    }
  }, [chart, reactId])

  return (
    <figure
      ref={ref}
      className="overflow-hidden rounded-xl border border-border bg-card/70 p-4 will-change-[opacity,transform] sm:p-6"
    >
      {error ? (
        <p className="font-mono text-xs text-destructive">{error}</p>
      ) : (
        <div
          className="flex w-full justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
      {caption && (
        <figcaption className="mt-4 border-t border-border/60 pt-3 text-center text-xs text-muted-foreground sm:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
