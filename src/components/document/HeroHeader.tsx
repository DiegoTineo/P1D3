import { useEffect, useRef } from "react"

export function HeroHeader() {
  const headerRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLImageElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) {
      return
    }

    let rafId = 0

    const updateParallax = () => {
      rafId = 0
      const header = headerRef.current
      const bg = bgRef.current
      const content = contentRef.current
      if (!header || !bg || !content) return

      const height = header.offsetHeight || 540
      const scrollY = Math.max(0, Math.min(window.scrollY, height))
      const progress = scrollY / height

      bg.style.transform = `translate3d(0, ${scrollY * 0.28}px, 0) scale(1.1)`
      content.style.transform = `translate3d(0, ${scrollY * 0.14}px, 0)`
      content.style.opacity = `${Math.max(0, 1 - progress * 1.15)}`
    }

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateParallax)
      }
    }

    updateParallax()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className="relative flex min-h-[460px] w-full items-end overflow-hidden bg-background sm:min-h-[540px]"
    >
      <img
        ref={bgRef}
        src="./hero-leonida.jpg"
        alt="Atardecer sobre la ciudad de Leonida"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-center will-change-transform [mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(66,4,82,0.18)_0%,rgba(20,6,30,0.45)_52%,rgba(9,9,11,0.92)_84%,#09090B_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/25 to-transparent"
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-14 will-change-transform sm:px-10 sm:pb-16"
      >
        <p className="animate-in fade-in slide-in-from-bottom-3 duration-500 text-base font-bold tracking-[0.18em] text-vice-orange uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-xl">
          Algoritmos y Estructura de Datos 3
        </p>

        <h1 className="gta-title animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-100 duration-700 mt-3 text-4xl font-normal tracking-wide text-white uppercase sm:text-6xl sm:leading-[1.06]">
          <span className="block">Proyecto de la Unidad 1:</span>
          <span className="relative mt-1 inline-block text-5xl sm:text-7xl">
            <span
              aria-hidden="true"
              className="gta-title-stroke pointer-events-none absolute inset-0 select-none"
            >
              Archivos Leonida
            </span>
            <span className="gta-title-image-fill relative">
              Archivos Leonida
            </span>
          </span>
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both delay-200 duration-700 mt-3 text-lg font-semibold tracking-wide text-foreground/90 drop-shadow-[0_2px_6px_rgba(9,9,11,0.95)] sm:text-2xl">
          (Pilas, Colas y Bicolas)
        </p>
      </div>
    </header>
  )
}
