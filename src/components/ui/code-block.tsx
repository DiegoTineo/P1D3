import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { codeToHtml } from "shiki"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  filename?: string
  language?: string
}

export function CodeBlock({
  code,
  filename,
  language = "csharp",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState<string>("")

  useEffect(() => {
    let cancelled = false

    codeToHtml(code, {
      lang: language,
      theme: "tokyo-night",
    })
      .then((html) => {
        if (!cancelled) {
          setHighlightedHtml(html)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHighlightedHtml("")
        }
      })

    return () => {
      cancelled = true
    }
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#111015]">
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          {filename && (
            <span className="font-semibold text-foreground">{filename}</span>
          )}
          <span className="text-vice-pink uppercase">{language}</span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-vice-orange" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copiar
            </>
          )}
        </Button>
      </div>

      {highlightedHtml ? (
        <div
          className="overflow-x-auto text-sm leading-relaxed [&_.shiki]:!bg-transparent [&_.shiki]:p-4 [&_.shiki]:font-mono"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground/95">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
