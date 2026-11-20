import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "cn"
import { useScrollFade } from "@/hooks/useScrollFade"

interface PhaseBlockProps {
  phase: string
  name: string
  params: string
  returns?: string
  accentClassName?: string
  children: ReactNode
}

function resolveFillGradient(accentClassName?: string): string {
  if (accentClassName?.includes("indigo")) {
    return "from-vice-indigo via-vice-magenta to-vice-pink"
  }
  if (accentClassName?.includes("orange")) {
    return "from-vice-pink via-vice-orange to-vice-orange"
  }
  if (accentClassName?.includes("pink")) {
    return "from-vice-magenta via-vice-pink to-vice-orange"
  }
  return "from-vice-magenta via-vice-pink to-vice-orange"
}

export function PhaseBlock({
  phase,
  name,
  params,
  returns,
  accentClassName = "border-vice-magenta",
  children,
}: PhaseBlockProps) {
  const fadeRef = useScrollFade<HTMLElement>()
  const fillRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = fadeRef.current
    const fill = fillRef.current
    if (!el || !fill) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) {
      fill.style.transform = "scaleY(1)"
      return
    }

    let rafId = 0

    const updateProgress = () => {
      rafId = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const triggerY = vh * 0.68
      const progress = Math.max(
        0,
        Math.min(1, (triggerY - rect.top) / Math.max(1, rect.height))
      )
      fill.style.transform = `scaleY(${progress.toFixed(4)})`
    }

    const schedule = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })

    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [fadeRef])

  return (
    <article
      ref={fadeRef}
      className="relative pl-6 will-change-[opacity,transform]"
    >
      {/* Static muted track */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-full bg-border/50"
      />
      {/* Scroll-driven progress fill */}
      <span
        ref={fillRef}
        aria-hidden="true"
        style={{ transform: "scaleY(0)" }}
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top rounded-full bg-gradient-to-b will-change-transform",
          resolveFillGradient(accentClassName)
        )}
      />

      <div className="space-y-1">
        <span className="block font-mono text-base font-extrabold tracking-widest text-vice-orange uppercase sm:text-lg">
          {phase}
        </span>
        <h3 className="font-mono text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {name}
          <span className="font-semibold text-muted-foreground">({params})</span>
          {returns && (
            <>
              {" "}
              <span className="text-vice-pink">→ {returns}</span>
            </>
          )}
        </h3>
      </div>

      <div className="mt-4 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
        {children}
      </div>
    </article>
  )
}
