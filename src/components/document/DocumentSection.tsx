import type { ReactNode } from "react"
import { cn } from "cn"
import { SectionTitle } from "@/components/document/SectionTitle"
import { useScrollFade } from "@/hooks/useScrollFade"

interface DocumentSectionProps {
  id: string
  title: ReactNode
  children: ReactNode
  className?: string
}

export function DocumentSection({
  id,
  title,
  children,
  className,
}: DocumentSectionProps) {
  const ref = useScrollFade<HTMLElement>()
  const headingId = `${id}-heading`

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={cn("space-y-6 will-change-[opacity,transform]", className)}
    >
      <SectionTitle id={headingId}>{title}</SectionTitle>
      {children}
    </section>
  )
}
