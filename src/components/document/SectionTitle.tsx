import type { ReactNode } from "react"
import { cn } from "cn"
import { useInView } from "@/hooks/useInView"

interface SectionTitleProps {
  id?: string
  children: ReactNode
  className?: string
}

export function SectionTitle({ id, children, className }: SectionTitleProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2)

  return (
    <div ref={ref} className="space-y-3">
      <h2
        id={id}
        className={cn(
          "text-3xl font-extrabold tracking-tight text-foreground transition-all duration-700 ease-out motion-reduce:transition-none sm:text-4xl",
          isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          className
        )}
      >
        {children}
      </h2>
      <div className="relative h-px w-full overflow-hidden bg-border">
        <div
          aria-hidden="true"
          className={cn(
            "h-full w-32 origin-left bg-gradient-to-r from-vice-magenta via-vice-pink to-vice-orange transition-transform duration-700 delay-150 ease-out motion-reduce:transition-none",
            isInView ? "scale-x-100" : "scale-x-0"
          )}
        />
      </div>
    </div>
  )
}
