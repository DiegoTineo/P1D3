import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"

interface ImagesBase64PageProps {
  onBack: () => void
}

const DECODE_IMAGE_CODE = `using System;
using System.Drawing;
using System.IO;

public static Image DecodificarImagenBase64(string base64)
{
    // 1. Convierte el texto Base64 en su arreglo de bytes original (JPG/PNG)
    byte[] bytes = Convert.FromBase64String(base64);

    // 2. Crea un flujo en RAM y clona a Bitmap para poder cerrar el MemoryStream
    //    sin provocar errores de GDI+ al pintar en Windows Forms.
    using (var ms = new MemoryStream(bytes))
    using (var imagenTemporal = Image.FromStream(ms))
    {
        return new Bitmap(imagenTemporal);
    }
}`

const SHOW_AND_SAVE_CODE = `// Mostrar la imagen decodificada en un PictureBox de Windows Forms
Image imagen = DecodificarImagenBase64(reg.Payload);
pictureBoxSlide.Image = imagen;
pictureBoxSlide.SizeMode = PictureBoxSizeMode.Zoom;

// (Opcional) Guardar la imagen en disco directamente desde los bytes
byte[] bytes = Convert.FromBase64String(reg.Payload);
File.WriteAllBytes("imagen_guardada.jpg", bytes);

// (Alternativa) Guardar desde el objeto Bitmap ya decodificado
imagen.Save("imagen_desde_bitmap.jpg", System.Drawing.Imaging.ImageFormat.Jpeg);`

const DISPOSE_IMAGES_CODE = `// Al cerrar el formulario (FormClosing), libera los Bitmaps para no dejar memoria colgada
private void Form1_FormClosing(object sender, FormClosingEventArgs e)
{
    pictureBoxSlide.Image = null;
    foreach (Image imagen in _imagenesCargadas)
    {
        imagen.Dispose();
    }
}`

export function ImagesBase64Page({ onBack }: ImagesBase64PageProps) {
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
            De Texto <span className="text-vice-pink">Base64</span> a{" "}
            <span className="text-vice-orange">Imagen</span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Una imagen en disco es simplemente una secuencia de bytes.{" "}
            <strong className="font-semibold text-foreground">Base64</strong>{" "}
            representa esos bytes usando solo caracteres de texto seguros (
            <code className="font-mono text-sm text-vice-pink">
              A-Z, a-z, 0-9, +, /, =
            </code>
            ), lo que permite incrustar imágenes completas dentro de un archivo{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              .txt
            </code>{" "}
            y reconstruirlos en memoria sin librerías externas.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            1. Convertir texto Base64 a{" "}
            <code className="font-mono text-vice-pink">Image</code> en RAM
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            En Windows Forms,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              Image.FromStream
            </code>{" "}
            exige que el{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground">
              MemoryStream
            </code>{" "}
            permanezca abierto mientras se dibuja la imagen. Clonar el resultado
            en{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              new Bitmap(imagenTemporal)
            </code>{" "}
            independiza la imagen del stream y te permite cerrarlo de inmediato:
          </p>
          <CodeBlock code={DECODE_IMAGE_CODE} filename="DecodificadorImagen.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            2. Mostrar en PictureBox y guardar en disco
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Una vez decodificada, puedes asignarla a tu{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              PictureBox
            </code>{" "}
            (y reutilizar la misma referencia en múltiples objetos{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-orange">
              Pagina
            </code>
            ) o guardarla como archivo{" "}
            <code className="font-mono text-sm text-muted-foreground">.jpg</code>{" "}
            en disco:
          </p>
          <CodeBlock code={SHOW_AND_SAVE_CODE} filename="UsoEnFormulario.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            3. Buenas prácticas: liberar recursos al cerrar
          </h2>
          <CodeBlock code={DISPOSE_IMAGES_CODE} filename="Form1.cs" />
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
