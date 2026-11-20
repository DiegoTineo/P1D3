import { useEffect, useId, useRef, useState } from "react"
import mermaid from "mermaid"

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
  const figureRef = useRef<HTMLElement | null>(null)
  const topBarRef = useRef<HTMLSpanElement | null>(null)
  const bottomBarRef = useRef<HTMLSpanElement | null>(null)
  const reactId = useId().replace(/:/g, "")
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const figure = figureRef.current
    const topBar = topBarRef.current
    const bottomBar = bottomBarRef.current
    if (!figure || !topBar || !bottomBar) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) {
      topBar.style.transform = "scaleY(0)"
      bottomBar.style.transform = "scaleY(0)"
      return
    }

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = figure.getBoundingClientRect()
      const vh = window.innerHeight || 800

      // Smooth cinematic shutter open as diagram enters reading focus, close on exit
      const zone = Math.max(160, vh * 0.34)
      const enter = Math.max(0, Math.min(1, (vh - rect.top) / zone))
      const exit = Math.max(0, Math.min(1, rect.bottom / zone))
      const openness = Math.min(enter, exit)
      // Smoothstep easing for cinematic shutter feel
      const eased = openness * openness * (3 - 2 * openness)
      const shutter = 1 - eased

      topBar.style.transform = `scaleY(${shutter.toFixed(4)})`
      bottomBar.style.transform = `scaleY(${shutter.toFixed(4)})`
      topBar.style.opacity = shutter > 0.01 ? "1" : "0"
      bottomBar.style.opacity = shutter > 0.01 ? "1" : "0"
    }

    const schedule = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })

    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [svg])

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
      ref={figureRef}
      className="relative overflow-hidden rounded-xl border border-border bg-card/70 p-4 sm:p-6"
    >
      {/* Top cinema letterbox shutter */}
      <span
        ref={topBarRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/2 origin-top border-b border-vice-pink/35 bg-[#09090B] will-change-transform"
      />
      {/* Bottom cinema letterbox shutter */}
      <span
        ref={bottomBarRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 origin-bottom border-t border-vice-pink/35 bg-[#09090B] will-change-transform"
      />

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
