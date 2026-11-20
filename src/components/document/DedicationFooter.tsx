import DitherVeil from "@/components/DitherVeil"
import { useScrollFade } from "@/hooks/useScrollFade"

export function DedicationFooter() {
  const ref = useScrollFade<HTMLElement>()

  return (
    <footer
      ref={ref}
      className="relative mt-8 w-full overflow-hidden will-change-[opacity,transform]"
    >
      {/* Full-bleed palm pattern background */}
      <img
        src="./footer-palms.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#09090B_0%,rgba(9,9,11,0.62)_24%,rgba(9,9,11,0.42)_65%,rgba(9,9,11,0.72)_100%)]"
      />

      {/* Content (no z-index stacking context so mix-blend-screen blends with palms) */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pt-16 pb-24 sm:px-10 sm:pt-20 sm:pb-28 lg:grid-cols-2">
        {/* Left: Frameless DitherVeil blended over the palms */}
        <div className="relative h-[380px] w-full mix-blend-screen sm:h-[460px]">
          <DitherVeil
            src="https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop"
            pattern="floyd"
            pixelSize={2}
            inkColor="#000000"
            paperColor="#f4f1ea"
            revealRadius={200}
            softness={0.6}
            linger={1}
            fit="contain"
            rimColor="#a78bfa"
            palette="duotone"
            levels={2}
            contrast={1.15}
            brightness={0}
            rim={0}
            reverse={false}
            wander={false}
            clickBurst
          />
        </div>

        {/* Right: Quote + Dedication */}
        <div className="flex flex-col items-start gap-8 text-left">
          <blockquote className="space-y-2.5">
            <p className="text-xl font-medium tracking-tight text-white italic drop-shadow-[0_2px_10px_rgba(9,9,11,0.9)] sm:text-2xl">
              &ldquo;La programación no se trata de lo que sabes, sino de lo que
              puedes averiguar.&rdquo;
            </p>
            <footer className="font-mono text-xs tracking-widest text-vice-orange uppercase drop-shadow-[0_1px_6px_rgba(9,9,11,0.95)] sm:text-sm">
              — Chris Pine
            </footer>
          </blockquote>

          <div
            aria-hidden="true"
            className="h-px w-20 bg-gradient-to-r from-vice-pink/80 to-transparent"
          />

          <div className="space-y-2.5">
            <p className="text-sm leading-relaxed text-foreground/90 drop-shadow-[0_1px_8px_rgba(9,9,11,0.95)] sm:text-base">
              Con cariño, dedico este proyecto a mis alumnos, con el fin de que
              comprendan que incluso las cosas más simples, con un poco de
              ingenio, pueden convertirse en algo genial.
            </p>
            <p className="font-mono text-sm font-semibold text-white drop-shadow-[0_1px_6px_rgba(9,9,11,0.95)]">
              Prof. Diego Tineo
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
