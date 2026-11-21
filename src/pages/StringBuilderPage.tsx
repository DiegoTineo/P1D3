import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"

interface StringBuilderPageProps {
  onBack: () => void
}

const BAD_CONCAT_CODE = `// PROHIBIDO: complejidad O(n²)
// Cada += crea un nuevo string en memoria y copia TODO lo acumulado antes.
// Con el Base64 del audio (~4.8 millones de chars), esto congela WinForms.
string payload = "";
foreach (char c in linea)
{
    payload += c; // Copia millones de caracteres en cada vuelta
}`

const GOOD_EXTRACTOR_CODE = `using System.Text;

// CORRECTO: complejidad O(n) — termina en ~15 milisegundos
var pila = new PilaConBicola<char>();
var buffer = new StringBuilder();

foreach (char c in linea)
{
    if (pila.EstaVacia() && (c == '(' || c == '[' || c == '<' || c == '{'))
    {
        pila.Apilar(c);
        buffer.Clear();
    }
    else if (!pila.EstaVacia())
    {
        if (EsCierreCorrespondiente(pila.VerTope(), c))
        {
            char apertura = pila.Desapilar();
            string valorCampo = buffer.ToString(); // 1 sola conversión al final
            buffer.Clear();
            // Asignar valorCampo a id, canal, operacion o payload
        }
        else
        {
            buffer.Append(c); // Escribe directo en el buffer mutable
        }
    }
}`

const GOOD_REVERSE_CODE = `using System.Text;

// También en Fase 5 al desencriptar textos con PilaConBicola<char>
private static string InvertirTexto(string textoInvertido)
{
    var pila = new PilaConBicola<char>();
    foreach (char c in textoInvertido)
    {
        pila.Apilar(c);
    }

    var sb = new StringBuilder(textoInvertido.Length);
    while (!pila.EstaVacia())
    {
        sb.Append(pila.Desapilar());
    }
    return sb.ToString();
}`

export function StringBuilderPage({ onBack }: StringBuilderPageProps) {
  return (
    <div className="min-h-svh bg-background text-foreground selection:bg-vice-magenta/40 selection:text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 sm:py-14">
        <div>
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="gap-2 pl-0 text-muted-foreground hover:bg-transparent hover:text-vice-pink"
          >
            <ArrowLeft className="size-4" />
            Volver al enunciado del proyecto
          </Button>
        </div>

        <header className="space-y-4 border-b border-border pb-6">
          <p className="text-xs font-bold tracking-[0.2em] text-vice-orange uppercase sm:text-sm">
            Rendimiento Crítico · C# (.NET)
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            <span className="text-vice-pink">StringBuilder</span> vs{" "}
            <span className="font-mono text-vice-orange">string +=</span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            En C#, el tipo{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              string
            </code>{" "}
            es <strong className="font-semibold text-foreground">inmutable</strong>:
            no se puede modificar en su sitio.{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              System.Text.StringBuilder
            </code>{" "}
            mantiene un arreglo interno mutable de caracteres que crece solo
            cuando hace falta, evitando millones de copias en memoria.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            ¿Por qué es obligatorio en el proyecto?
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            El archivo{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              transmisiones.txt
            </code>{" "}
            contiene imágenes y una pista de audio en Base64 (una sola línea de{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              &lt;AUDIO&gt;
            </code>{" "}
            supera los <strong className="font-semibold text-foreground">4.7 millones de caracteres</strong>).
            Si acumulas ese payload con{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-destructive">
              +=
            </code>{" "}
            dentro de un bucle, el tiempo crece de forma cuadrática (
            <code className="font-mono text-sm text-vice-orange">O(n²)</code>) y
            tu programa de Windows Forms se congelará indefinidamente. Con{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              StringBuilder
            </code>{" "}
            es lineal (
            <code className="font-mono text-sm text-vice-orange">O(n)</code>) y
            procesa todo el archivo en milisegundos.
          </p>
          <CodeBlock code={BAD_CONCAT_CODE} filename="LoQueNoDebesHacer.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            1. Uso en Fase 2 (Extractor con Pila)
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Tu{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              PilaConBicola&lt;char&gt;
            </code>{" "}
            sigue controlando las aperturas y cierres de los delimitadores;{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              StringBuilder
            </code>{" "}
            solo reemplaza a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
              +=
            </code>{" "}
            al guardar los caracteres del campo:
          </p>
          <CodeBlock code={GOOD_EXTRACTOR_CODE} filename="ChannelEnqueuer.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            2. Uso en Fase 5 (Desencriptación de textos)
          </h2>
          <CodeBlock code={GOOD_REVERSE_CODE} filename="StoryBuilder.cs" />
        </section>

        <div className="border-t border-border pt-6">
          <Button type="button" onClick={onBack} className="gap-2">
            <ArrowLeft className="size-4" />
            Volver al proyecto
          </Button>
        </div>
      </div>
    </div>
  )
}
