import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"

interface GenericTypesPageProps {
  onBack: () => void
}

const GENERIC_BICOLA_CODE = `public class Bicola<T>
{
    private class Nodo
    {
        public T Dato { get; }
        public Nodo? Anterior { get; set; }
        public Nodo? Siguiente { get; set; }

        public Nodo(T dato) => Dato = dato;
    }

    private Nodo? _frente;
    private Nodo? _final;

    public void InsertarFrente(T dato) { /* ... */ }
    public void InsertarFinal(T dato) { /* ... */ }
    public T EliminarFrente() { /* ... */ }
    public T EliminarFinal() { /* ... */ }
}`

const REUSE_EXAMPLES_CODE = `// 1. Misma PilaConBicola<T> para caracteres (Fase 1 y Fase 5)
var pilaDelimitadores = new PilaConBicola<char>();
pilaDelimitadores.Apilar('{');
char apertura = pilaDelimitadores.Desapilar();

// 2. Misma PilaConBicola<T> para invertir registros (Fase 3: INVERTIR)
var pilaInversion = new PilaConBicola<Registro>();
pilaInversion.Apilar(registroActual);

// 3. Misma ColaConBicola<T> para canales y máquinas
var canal1 = new ColaConBicola<Registro>();
var colaGuardado = new ColaConBicola<Registro>();

// 4. Misma Bicola<T> para el carrusel circular de páginas (Fase 5)
var paginas = new Bicola<Pagina>();
paginas.InsertarFinal(nuevaPagina);`

const WITHOUT_GENERICS_CODE = `// SIN Genéricos: tendrías que duplicar la misma clase una y otra vez
public class BicolaDeChar { ... }
public class BicolaDeRegistro { ... }
public class BicolaDePagina { ... }

// CON Genéricos: escribes la estructura UNA SOLA VEZ
public class Bicola<T> { ... }`

export function GenericTypesPage({ onBack }: GenericTypesPageProps) {
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
            Guía Rápida · C# (.NET)
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Generic Types (
            <span className="text-vice-pink">&lt;T&gt;</span>)
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Los tipos genéricos permiten escribir una clase o estructura de
            datos una sola vez dejando el tipo de dato como un{" "}
            <strong className="font-semibold text-foreground">
              parámetro (<code className="font-mono text-vice-orange">T</code>)
            </strong>{" "}
            que se define al momento de instanciarla, con total seguridad de
            tipos en compilación.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            ¿Por qué son obligatorios en este proyecto?
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            En el proyecto necesitas pilas de <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">char</code>{" "}
            (para leer delimitadores e invertir textos), pilas y colas de{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">Registro</code>{" "}
            (para los 3 canales y el Round-Robin) y una bicola de{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">Pagina</code>{" "}
            (para el carrusel circular). Sin genéricos tendrías que copiar y
            pegar el mismo código varias veces:
          </p>
          <CodeBlock code={WITHOUT_GENERICS_CODE} filename="Comparativa.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            1. Cómo declarar tu TDA genérico
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Solo agregas{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              &lt;T&gt;
            </code>{" "}
            junto al nombre de la clase y usas{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              T
            </code>{" "}
            en lugar de un tipo fijo como{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
              int
            </code>{" "}
            o{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
              string
            </code>
            :
          </p>
          <CodeBlock code={GENERIC_BICOLA_CODE} filename="Bicola.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            2. Cómo reutilizarlo en todo el proyecto
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Al crear cada instancia indicas entre{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              &lt; &gt;
            </code>{" "}
            qué tipo almacenará. El compilador valida todo automáticamente sin
            necesidad de hacer <em>casting</em> manual:
          </p>
          <CodeBlock code={REUSE_EXAMPLES_CODE} filename="Procesador.cs" />
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
