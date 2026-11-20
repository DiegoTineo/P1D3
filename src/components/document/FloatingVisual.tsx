import { useEffect, useRef } from "react"
import { cn } from "cn"

interface FloatingVisualProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  animationClassName?: string
  glowClassName?: string
  tiltDirection?: 1 | -1
}

export function FloatingVisual({
  src,
  alt,
  className,
  imageClassName,
  animationClassName = "animate-float-slow",
  glowClassName = "from-vice-magenta/25 via-vice-indigo/15 to-transparent",
  tiltDirection = 1,
}: FloatingVisualProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const motionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const motion = motionRef.current
    if (!container || !motion) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh
      const clamped = Math.max(-1, Math.min(1, centerOffset))

      const y = clamped * 28
      const rotate = clamped * 3.5 * tiltDirection
      const scale = 1 - Math.abs(clamped) * 0.06

      motion.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`
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
  }, [tiltDirection])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto flex w-full max-w-[300px] items-center justify-center sm:max-w-[340px]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-4 rounded-full bg-radial blur-3xl",
          glowClassName
        )}
      />

      <div ref={motionRef} className="relative will-change-transform">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "h-auto w-full select-none object-contain transition-transform duration-500 ease-out hover:scale-[1.03]",
            animationClassName,
            imageClassName
          )}
        />
      </div>
    </div>
  )
}
