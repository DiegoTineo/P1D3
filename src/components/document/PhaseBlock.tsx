import { useEffect, useRef, type ComponentType, type ReactNode } from "react"
import { FaStar } from "react-icons/fa6"
import { cn } from "cn"
import { useScrollFade } from "@/hooks/useScrollFade"

const TOTAL_WANTED_STARS = 6

export type PhaseTone = "pink" | "purple"

interface PhaseBlockProps {
  phase: string
  name: string
  params: string
  returns?: string
  tone: PhaseTone
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}

const TONE_STYLES: Record<
  PhaseTone,
  {
    icon: string
    glow: string
    label: string
    returns: string
    bar: string
  }
> = {
  pink: {
    icon: "text-vice-pink drop-shadow-[0_10px_24px_rgba(220,71,202,0.38)]",
    glow: "from-vice-magenta/30 via-vice-pink/15 to-transparent",
    label: "from-vice-pink to-vice-orange",
    returns: "text-vice-pink",
    bar: "from-vice-magenta via-vice-pink to-vice-orange",
  },
  purple: {
    icon: "text-vice-indigo drop-shadow-[0_10px_24px_rgba(114,86,206,0.45)]",
    glow: "from-vice-indigo/35 via-vice-magenta/15 to-transparent",
    label: "from-vice-indigo to-vice-magenta",
    returns: "text-vice-indigo",
    bar: "from-vice-indigo via-vice-magenta to-vice-pink",
  },
}

export function PhaseBlock({
  phase,
  name,
  params,
  returns,
  tone,
  icon: Icon,
  children,
}: PhaseBlockProps) {
  const fadeRef = useScrollFade<HTMLElement>()
  const fillRef = useRef<HTMLSpanElement | null>(null)
  const styles = TONE_STYLES[tone]
  const wantedLevel = Math.max(
    0,
    Math.min(TOTAL_WANTED_STARS, Number(phase.match(/\d+/)?.[0] ?? 0))
  )

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
      className="flex flex-col items-start gap-6 will-change-[opacity,transform] md:flex-row md:gap-10"
    >
      {/* Top-aligned phase icon */}
      <div className="relative flex shrink-0 items-center justify-center p-2 md:pt-1">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full bg-radial blur-2xl",
            styles.glow
          )}
        />
        <Icon
          aria-hidden="true"
          className={cn(
            "animate-float-slow relative size-16 sm:size-24",
            styles.icon
          )}
        />
      </div>

      {/* Phase body with scroll-driven progress border */}
      <div className="relative min-w-0 flex-1 pl-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-full bg-border/50"
        />
        <span
          ref={fillRef}
          aria-hidden="true"
          style={{ transform: "scaleY(0)" }}
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top rounded-full bg-gradient-to-b will-change-transform",
            styles.bar
          )}
        />

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={cn(
                "inline-block bg-gradient-to-r bg-clip-text font-[family-name:var(--font-display)] text-3xl tracking-wider text-transparent uppercase sm:text-4xl",
                styles.label
              )}
            >
              {phase}
            </span>

            {wantedLevel > 0 && (
              <div
                aria-label={`${wantedLevel} de ${TOTAL_WANTED_STARS} estrellas`}
                className="flex items-center gap-1"
              >
                {Array.from({ length: TOTAL_WANTED_STARS }, (_, index) => {
                  const active = index < wantedLevel
                  return (
                    <FaStar
                      key={index}
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-opacity sm:size-[18px]",
                        active
                          ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.65)]"
                          : "text-white/15"
                      )}
                    />
                  )
                })}
              </div>
            )}
          </div>
          <h3 className="font-mono text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            {name}
            <span className="font-semibold text-muted-foreground">
              ({params})
            </span>
            {returns && (
              <>
                {" "}
                <span className={styles.returns}>→ {returns}</span>
              </>
            )}
          </h3>
        </div>

        <div className="mt-4 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
          {children}
        </div>
      </div>
    </article>
  )
}
