import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"

interface ReadFilePageProps {
  onBack: () => void
}

const OPEN_FILE_DIALOG_CODE = `using System;
using System.IO;
using System.Windows.Forms;

private string _contenidoArchivo = string.Empty;

private void btnCargarArchivo_Click(object sender, EventArgs e)
{
    using var dialogo = new OpenFileDialog
    {
        Title = "Seleccionar archivo de transmisiones",
        Filter = "Archivos de texto (*.txt)|*.txt|Todos los archivos (*.*)|*.*"
    };

    if (dialogo.ShowDialog() != DialogResult.OK)
    {
        return;
    }

    // Lee el contenido íntegro del archivo en un string
    _contenidoArchivo = File.ReadAllText(dialogo.FileName);
    txtVistaPrevia.Text = ConstruirVistaPrevia(_contenidoArchivo);
}`

const READ_FROM_BASE_DIR_CODE = `using System;
using System.IO;

public static string FileReader(string nombreArchivo)
{
    string ruta = Path.Combine(AppContext.BaseDirectory, nombreArchivo);

    if (!File.Exists(ruta))
    {
        throw new FileNotFoundException("No se encontró el archivo.", ruta);
    }

    return File.ReadAllText(ruta);
}`

const SAFE_PREVIEW_CODE = `using System;
using System.IO;
using System.Text;

// Muestra el archivo en un TextBox sin congelar la interfaz por líneas Base64 largas
private static string ConstruirVistaPrevia(string contenido, int maxPorLinea = 120)
{
    var sb = new StringBuilder();
    using var reader = new StringReader(contenido);

    while (reader.ReadLine() is { } linea)
    {
        if (linea.Length <= maxPorLinea)
        {
            sb.AppendLine(linea);
        }
        else
        {
            sb.Append(linea.AsSpan(0, maxPorLinea));
            sb.AppendLine($"... [+{linea.Length - maxPorLinea:N0} caracteres]");
        }
    }

    return sb.ToString();
}`

export function ReadFilePage({ onBack }: ReadFilePageProps) {
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
            Guía Práctica · C# Windows Forms
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Cómo <span className="text-vice-pink">Leer un Archivo</span> en{" "}
            <span className="text-vice-orange">C#</span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            En la Fase 1 (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              FileReader
            </code>
            ), tu aplicación debe cargar{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              transmisiones.txt
            </code>{" "}
            al hacer clic y mostrar su contenido en pantalla sin bloquear
            Windows Forms. Aquí tienes las dos formas estándar con{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              System.IO
            </code>
            .
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            1. Seleccionar el archivo con{" "}
            <code className="font-mono text-vice-pink">OpenFileDialog</code>
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Permite que el usuario elija{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              transmisiones.txt
            </code>{" "}
            desde cualquier carpeta al hacer clic en un botón:
          </p>
          <CodeBlock code={OPEN_FILE_DIALOG_CODE} filename="Form1.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            2. Leer desde la carpeta del ejecutable (
            <code className="font-mono text-vice-pink">
              AppContext.BaseDirectory
            </code>
            )
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Si colocas{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              transmisiones.txt
            </code>{" "}
            junto a tu proyecto (con{" "}
            <strong className="font-semibold text-foreground">
              Copiar si es posterior
            </strong>{" "}
            en Visual Studio), puedes resolver su ruta sin hardcodear{" "}
            <code className="font-mono text-sm text-muted-foreground">
              C:\Users\...
            </code>
            :
          </p>
          <CodeBlock code={READ_FROM_BASE_DIR_CODE} filename="FileReader.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            3. Mostrar el contenido en pantalla sin congelar el{" "}
            <code className="font-mono text-vice-pink">TextBox</code>
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Como el archivo contiene líneas Base64 de millones de caracteres,
            asignar los 6.8 MB directos a un{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
              TextBox
            </code>{" "}
            puede volver lenta la ventana. Guarda el contenido completo en
            memoria para la Fase 2 y muestra una vista previa truncada por
            línea:
          </p>
          <CodeBlock code={SAFE_PREVIEW_CODE} filename="VistaPrevia.cs" />
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
