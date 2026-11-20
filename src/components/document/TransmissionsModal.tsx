import { useEffect, useMemo, useState } from "react"
import { Check, Copy, Download, FileText, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransmissionsModalProps {
  open: boolean
  onClose: () => void
}

const ASSET_URL = "./transmisiones.txt"
const MAX_LINE_PREVIEW_CHARS = 180

function buildPreviewLines(rawText: string): string[] {
  return rawText.split(/\r?\n/).map((line) => {
    if (line.length <= MAX_LINE_PREVIEW_CHARS) {
      return line
    }
    const omitted = line.length - MAX_LINE_PREVIEW_CHARS
    return `${line.slice(0, MAX_LINE_PREVIEW_CHARS)}...  [+${omitted.toLocaleString()} chars completos al copiar/descargar]`
  })
}

export function TransmissionsModal({ open, onClose }: TransmissionsModalProps) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open || content !== null) {
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(ASSET_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`No se pudo cargar ${ASSET_URL} (HTTP ${res.status})`)
        }
        return res.text()
      })
      .then((text) => {
        if (!cancelled) {
          setContent(text)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Error cargando el archivo."
          )
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [open, content])

  useEffect(() => {
    if (!open) {
      return
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, onClose])

  const previewLines = useMemo(
    () => (content ? buildPreviewLines(content) : []),
    [content]
  )

  const sizeMb = useMemo(
    () =>
      content ? (new Blob([content]).size / (1024 * 1024)).toFixed(2) : null,
    [content]
  )

  if (!open) {
    return null
  }

  const handleCopyAll = async () => {
    if (!content) return
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="transmissions-modal-title"
      className="fixed inset-0 z-[60] flex flex-col bg-[#09090B]/98 backdrop-blur-md"
    >
      {/* Top Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/90 px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-3">
          <FileText className="size-5 text-vice-pink" />
          <div>
            <h2
              id="transmissions-modal-title"
              className="font-mono text-sm font-bold text-foreground sm:text-base"
            >
              transmisiones.txt
            </h2>
            <p className="text-xs text-muted-foreground">
              {content
                ? `${previewLines.filter(Boolean).length} registros · ${sizeMb} MB · Vista previa optimizada (copia/descarga el archivo íntegro)`
                : "Cargando asset público..."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            disabled={!content}
            onClick={handleCopyAll}
            className="gap-1.5"
          >
            {copied ? (
              <>
                <Check className="size-4" />
                Copiado completo
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copiar todo
              </>
            )}
          </Button>

          <a
            href={ASSET_URL}
            download="transmisiones.txt"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-muted px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted/80"
          >
            <Download className="size-3.5 text-vice-orange" />
            Descargar .txt
          </a>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="size-8 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>
      </header>

      {/* Body */}
      <div data-lenis-prevent className="flex-1 overflow-auto p-5 sm:p-8">
        {loading ? (
          <div className="flex h-full items-center justify-center gap-2.5 text-sm text-muted-foreground">
            <Loader2 className="size-5 animate-spin text-vice-pink" />
            Cargando transmisiones.txt...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 font-mono text-sm text-destructive">
            {error}
          </div>
        ) : (
          <pre className="font-mono text-xs leading-6 text-foreground/90 sm:text-sm">
            {previewLines.map((line, index) => (
              <div
                key={index}
                className="flex gap-4 rounded px-2 hover:bg-white/5"
              >
                <span className="w-8 shrink-0 text-right text-muted-foreground/50 select-none">
                  {index + 1}
                </span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </pre>
        )}
      </div>
    </div>
  )
}
