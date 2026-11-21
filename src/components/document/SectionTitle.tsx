import { isValidElement, type ReactNode } from "react"
import { cn } from "cn"
import TechText from "@/components/TechText"
import { TooltipContent } from "@/components/ui/tooltip"
import { useInView } from "@/hooks/useInView"

interface SectionTitleProps {
  id?: string
  children: ReactNode
  className?: string
}

function extractPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(extractPlainText).join("")
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === TooltipContent) {
      return ""
    }
    return extractPlainText(node.props.children)
  }
  return ""
}

export function SectionTitle({ id, children, className }: SectionTitleProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2)
  const plainText = extractPlainText(children).replace(/\s+/g, " ").trim()

  return (
    <div ref={ref} className="space-y-2">
      <h2 id={id} className="sr-only">
        {plainText}
      </h2>

      <div
        className={cn(
          "relative h-14 w-full text-foreground sm:h-20",
          className
        )}
      >
        <TechText
          text={plainText}
          fontWeight={700}
          fontSize={44}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          intro="none"
          introDuration={2}
          clickKick
          guides={false}
          fontFamily=""
          letterSpacing={-0.03}
          accentColor="#FC73A9"
          reach={160}
          softness={0.7}
          lineStyle="dashed"
          strokeWidth={1.5}
          speed={0.35}
          bounce={0.4}
          selection
          labels
          color="currentColor"
          align="left"
          draggable
          sweep
        />
      </div>

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
