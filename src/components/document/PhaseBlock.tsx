import type { ReactNode } from "react"
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

export function PhaseBlock({
  phase,
  name,
  params,
  returns,
  accentClassName = "border-vice-magenta",
  children,
}: PhaseBlockProps) {
  const ref = useScrollFade<HTMLElement>()

  return (
    <article
      ref={ref}
      className={cn(
        "border-l-[3px] pl-6 will-change-[opacity,transform]",
        accentClassName
      )}
    >
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
