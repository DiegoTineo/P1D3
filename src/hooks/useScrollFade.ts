import { useEffect, useRef } from "react"

export function useScrollFade<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) {
      el.style.opacity = "1"
      el.style.transform = "none"
      return
    }

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const fadeZone = Math.max(140, vh * 0.28)

      const enter = Math.max(0, Math.min(1, (vh - rect.top) / fadeZone))
      const exit = Math.max(0, Math.min(1, rect.bottom / fadeZone))
      const visibility = Math.min(enter, exit)

      const translateY =
        enter < 1 ? (1 - enter) * 20 : exit < 1 ? -(1 - exit) * 16 : 0

      el.style.opacity = visibility.toFixed(3)
      el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`
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
  }, [])

  return ref
}
