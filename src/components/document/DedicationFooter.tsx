import { useScrollFade } from "@/hooks/useScrollFade"

export function DedicationFooter() {
  const ref = useScrollFade<HTMLElement>()

  return (
    <footer
      ref={ref}
      className="border-t border-border/70 pt-12 pb-6 will-change-[opacity,transform]"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <blockquote className="space-y-2.5">
          <p className="text-xl font-medium tracking-tight text-foreground/95 italic sm:text-2xl">
            &ldquo;La programación no se trata de lo que sabes, sino de lo que
            puedes averiguar.&rdquo;
          </p>
          <footer className="font-mono text-xs tracking-widest text-vice-orange uppercase sm:text-sm">
            — Chris Pine
          </footer>
        </blockquote>

        <div
          aria-hidden="true"
          className="h-px w-20 bg-gradient-to-r from-transparent via-vice-pink/60 to-transparent"
        />

        <div className="space-y-2.5">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Con cariño, dedico este proyecto a mis alumnos, con el fin de que
            comprendan que incluso las cosas más simples, con un poco de
            ingenio, pueden convertirse en algo interesante.
          </p>
          <p className="font-mono text-sm font-semibold text-foreground/90">
            Prof. Diego Tineo
          </p>
        </div>
      </div>
    </footer>
  )
}
