import { useEffect, useState, type ReactNode } from "react"
import { cn } from "cn"

interface SectionBackdropProps {
  src: string
  children: ReactNode
  hideWhileVisibleId?: string
  hideThreshold?: number
  opacityClassName?: string
  imageClassName?: string
  contentClassName?: string
  className?: string
}

export function SectionBackdrop({
  src,
  children,
  hideWhileVisibleId,
  hideThreshold = 0.3,
  opacityClassName = "opacity-20",
  imageClassName,
  contentClassName,
  className,
}: SectionBackdropProps) {
  const [isVisible, setIsVisible] = useState(!hideWhileVisibleId)

  useEffect(() => {
    if (!hideWhileVisibleId) {
      setIsVisible(true)
      return
    }

    const target = document.getElementById(hideWhileVisibleId)
    if (!target) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio <= hideThreshold),
      { threshold: hideThreshold }
    )
    observer.observe(target)

    return () => observer.disconnect()
  }, [hideWhileVisibleId, hideThreshold])

  return (
    <div className={cn("relative w-full overflow-hidden py-14 sm:py-20", className)}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700",
          isVisible ? opacityClassName : "opacity-0",
          imageClassName
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#09090B_0%,rgba(9,9,11,0.74)_22%,rgba(9,9,11,0.78)_78%,#09090B_100%)]"
      />

      <div className={cn("relative mx-auto max-w-7xl px-6 sm:px-10", contentClassName)}>
        {children}
      </div>
    </div>
  )
}
