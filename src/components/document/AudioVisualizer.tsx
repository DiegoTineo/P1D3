import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  analyser: AnalyserNode | null
  isPlaying: boolean
}

const BAR_COUNT = 20
const CSS_WIDTH = 112
const CSS_HEIGHT = 28

export function AudioVisualizer({
  analyser,
  isPlaying,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const barsRef = useRef<Float32Array>(new Float32Array(BAR_COUNT))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = CSS_WIDTH * dpr
    canvas.height = CSS_HEIGHT * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const gradient = ctx.createLinearGradient(0, CSS_HEIGHT, CSS_WIDTH, 0)
    gradient.addColorStop(0, "#DC47CA")
    gradient.addColorStop(0.55, "#FC73A9")
    gradient.addColorStop(1, "#F99A60")

    const dataArray = analyser
      ? new Uint8Array(analyser.frequencyBinCount)
      : null

    let rafId = 0

    const drawBars = () => {
      ctx.clearRect(0, 0, CSS_WIDTH, CSS_HEIGHT)

      const gap = 2.5
      const barWidth = (CSS_WIDTH - gap * (BAR_COUNT - 1)) / BAR_COUNT
      let maxRemaining = 0

      if (isPlaying && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray)
      }

      for (let i = 0; i < BAR_COUNT; i++) {
        let target = 0
        if (isPlaying && dataArray) {
          const ratio = i / (BAR_COUNT - 1)
          // Logarithmic spread over the most active musical bins with gentle treble lift
          const binIndex = Math.min(
            dataArray.length - 1,
            1 + Math.floor(Math.pow(ratio, 1.45) * 26)
          )
          const boost = 0.85 + ratio * 0.55
          target = Math.min(1, (dataArray[binIndex] / 255) * boost)
        }

        const current = barsRef.current[i]
        const next = target > current ? current + (target - current) * 0.45 : current * 0.84
        barsRef.current[i] = next
        if (next > maxRemaining) maxRemaining = next

        const barHeight = Math.max(3, next * (CSS_HEIGHT - 4))
        const x = i * (barWidth + gap)
        const y = (CSS_HEIGHT - barHeight) / 2

        ctx.fillStyle = isPlaying ? gradient : "rgba(255, 255, 255, 0.22)"
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2)
        ctx.fill()
      }

      if (isPlaying || maxRemaining > 0.015) {
        rafId = window.requestAnimationFrame(drawBars)
      }
    }

    drawBars()

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [analyser, isPlaying])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: CSS_WIDTH, height: CSS_HEIGHT }}
      className="hidden shrink-0 md:block"
    />
  )
}
