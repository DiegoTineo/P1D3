import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react"

interface DiagramLightboxProps {
  svg: string
  caption?: string
  onClose: () => void
}

interface TransformState {
  scale: number
  x: number
  y: number
}

interface Point {
  x: number
  y: number
}

const MIN_SCALE = 0.6
const MAX_SCALE = 6
const DOUBLE_TAP_SCALE = 2.2
const DOUBLE_TAP_MS = 300
const DOUBLE_TAP_DISTANCE = 28

function clampScale(value: number): number {
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, value))
}

function distanceBetween(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

function midpointBetween(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

export function DiagramLightbox({
  svg,
  caption,
  onClose,
}: DiagramLightboxProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [baseSize, setBaseSize] = useState<{ width: number; height: number } | null>(null)
  const [transform, setTransform] = useState<TransformState>({
    scale: 1,
    x: 0,
    y: 0,
  })
  const transformRef = useRef(transform)
  transformRef.current = transform

  const [isDragging, setIsDragging] = useState(false)

  // Measure the fitted 1x SVG box so zooming resizes the vector SVG natively
  // instead of upscaling a rasterized GPU bitmap texture.
  useLayoutEffect(() => {
    const content = contentRef.current
    const stage = stageRef.current
    if (!content || !stage) return

    const svgEl = content.querySelector("svg")
    if (!svgEl) return

    const viewBox = svgEl.viewBox?.baseVal
    const intrinsicW =
      viewBox && viewBox.width > 0
        ? viewBox.width
        : svgEl.getBoundingClientRect().width || 800
    const intrinsicH =
      viewBox && viewBox.height > 0
        ? viewBox.height
        : svgEl.getBoundingClientRect().height || 500

    const maxW = Math.min(stage.clientWidth * 0.92, 1152)
    const maxH = stage.clientHeight * 0.82
    const fit = Math.min(maxW / intrinsicW, maxH / intrinsicH)

    setBaseSize({
      width: Math.max(1, intrinsicW * fit),
      height: Math.max(1, intrinsicH * fit),
    })
  }, [svg])

  // Active pointers for unified mouse drag + touch pinch/pan
  const pointersRef = useRef<Map<number, Point>>(new Map())
  const dragStartRef = useRef<{ pointer: Point; origin: Point } | null>(null)
  const pinchStartRef = useRef<{
    distance: number
    midpoint: Point
    transform: TransformState
  } | null>(null)
  const lastTapRef = useRef<{ time: number; point: Point } | null>(null)

  const zoomAtPoint = useCallback((nextScale: number, clientX: number, clientY: number) => {
    const stage = stageRef.current
    if (!stage) return

    const rect = stage.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = clientX - centerX
    const offsetY = clientY - centerY

    setTransform((prev) => {
      const clamped = clampScale(nextScale)
      const ratio = clamped / prev.scale
      return {
        scale: clamped,
        x: offsetX - (offsetX - prev.x) * ratio,
        y: offsetY - (offsetY - prev.y) * ratio,
      }
    })
  }, [])

  const resetView = useCallback(() => {
    setTransform({ scale: 1, x: 0, y: 0 })
  }, [])

  const stepZoom = useCallback(
    (factor: number) => {
      const stage = stageRef.current
      if (!stage) return
      const rect = stage.getBoundingClientRect()
      zoomAtPoint(
        transformRef.current.scale * factor,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      )
    },
    [zoomAtPoint]
  )

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "+" || e.key === "=") stepZoom(1.25)
      if (e.key === "-") stepZoom(0.8)
      if (e.key === "0") resetView()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose, resetView, stepZoom])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = Math.exp(-e.deltaY * 0.0018)
      zoomAtPoint(transformRef.current.scale * factor, e.clientX, e.clientY)
    }

    stage.addEventListener("wheel", onWheel, { passive: false })
    return () => stage.removeEventListener("wheel", onWheel)
  }, [zoomAtPoint])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return
    e.currentTarget.setPointerCapture(e.pointerId)

    const point: Point = { x: e.clientX, y: e.clientY }
    pointersRef.current.set(e.pointerId, point)

    if (pointersRef.current.size === 1) {
      const now = Date.now()
      const last = lastTapRef.current
      if (
        last &&
        now - last.time <= DOUBLE_TAP_MS &&
        distanceBetween(last.point, point) <= DOUBLE_TAP_DISTANCE
      ) {
        lastTapRef.current = null
        if (transformRef.current.scale > 1.15) {
          resetView()
        } else {
          zoomAtPoint(DOUBLE_TAP_SCALE, point.x, point.y)
        }
        return
      }
      lastTapRef.current = { time: now, point }

      dragStartRef.current = {
        pointer: point,
        origin: { x: transformRef.current.x, y: transformRef.current.y },
      }
      pinchStartRef.current = null
      setIsDragging(true)
    } else if (pointersRef.current.size === 2) {
      const [p1, p2] = Array.from(pointersRef.current.values())
      pinchStartRef.current = {
        distance: Math.max(1, distanceBetween(p1, p2)),
        midpoint: midpointBetween(p1, p2),
        transform: { ...transformRef.current },
      }
      dragStartRef.current = null
      lastTapRef.current = null
      setIsDragging(false)
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return
    const point: Point = { x: e.clientX, y: e.clientY }
    pointersRef.current.set(e.pointerId, point)

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const stage = stageRef.current
      if (!stage) return

      const [p1, p2] = Array.from(pointersRef.current.values())
      const currentDistance = distanceBetween(p1, p2)
      const currentMidpoint = midpointBetween(p1, p2)
      const start = pinchStartRef.current

      const nextScale = clampScale(
        start.transform.scale * (currentDistance / start.distance)
      )
      const ratio = nextScale / start.transform.scale

      const rect = stage.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const startOffsetX = start.midpoint.x - centerX
      const startOffsetY = start.midpoint.y - centerY
      const panX = currentMidpoint.x - start.midpoint.x
      const panY = currentMidpoint.y - start.midpoint.y

      setTransform({
        scale: nextScale,
        x: startOffsetX - (startOffsetX - start.transform.x) * ratio + panX,
        y: startOffsetY - (startOffsetY - start.transform.y) * ratio + panY,
      })
      return
    }

    if (pointersRef.current.size === 1 && dragStartRef.current) {
      const { pointer, origin } = dragStartRef.current
      const nextX = origin.x + (point.x - pointer.x)
      const nextY = origin.y + (point.y - pointer.y)
      setTransform((prev) => ({
        ...prev,
        x: nextX,
        y: nextY,
      }))
    }
  }

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    pointersRef.current.delete(e.pointerId)

    if (pointersRef.current.size === 1) {
      const [remaining] = Array.from(pointersRef.current.values())
      dragStartRef.current = {
        pointer: remaining,
        origin: { x: transformRef.current.x, y: transformRef.current.y },
      }
      pinchStartRef.current = null
      setIsDragging(true)
    } else if (pointersRef.current.size === 0) {
      dragStartRef.current = null
      pinchStartRef.current = null
      setIsDragging(false)
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption || "Vista ampliada del diagrama"}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col bg-[#09090B]/95 backdrop-blur-md select-none"
    >
      {/* Top toolbar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="pointer-events-auto rounded-md border border-border/80 bg-card/85 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          {Math.round(transform.scale * 100)}%
        </span>

        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => stepZoom(0.8)}
            aria-label="Alejar"
            className="flex size-9 items-center justify-center rounded-lg border border-border/80 bg-card/85 text-foreground/85 backdrop-blur transition-colors hover:border-vice-pink/60 hover:text-white"
          >
            <ZoomOut className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => stepZoom(1.25)}
            aria-label="Acercar"
            className="flex size-9 items-center justify-center rounded-lg border border-border/80 bg-card/85 text-foreground/85 backdrop-blur transition-colors hover:border-vice-pink/60 hover:text-white"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Restablecer zoom"
            className="flex size-9 items-center justify-center rounded-lg border border-border/80 bg-card/85 text-foreground/85 backdrop-blur transition-colors hover:border-vice-pink/60 hover:text-white"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista en pantalla completa"
            className="ml-1 flex size-9 items-center justify-center rounded-lg border border-vice-pink/50 bg-vice-deep/80 text-white backdrop-blur transition-colors hover:bg-vice-pink hover:text-[#09090B]"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Interactive gesture canvas */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        className={`relative flex flex-1 touch-none items-center justify-center overflow-hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          ref={contentRef}
          style={
            baseSize
              ? {
                  width: `${baseSize.width * transform.scale}px`,
                  height: `${baseSize.height * transform.scale}px`,
                  transform: `translate(${transform.x}px, ${transform.y}px)`,
                }
              : undefined
          }
          className="pointer-events-none flex shrink-0 items-center justify-center [&_svg]:!h-full [&_svg]:!max-h-none [&_svg]:!w-full [&_svg]:!max-w-none"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      {caption && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4">
          <p className="max-w-2xl rounded-lg border border-border/70 bg-card/85 px-4 py-2 text-center text-xs text-muted-foreground backdrop-blur sm:text-sm">
            {caption}
          </p>
        </div>
      )}
    </div>,
    document.body
  )
}
