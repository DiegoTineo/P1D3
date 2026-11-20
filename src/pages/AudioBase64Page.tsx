import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"

interface AudioBase64PageProps {
  onBack: () => void
}

const SAVE_AUDIO_CODE = `using System;
using System.IO;

// 1. Decodifica el Base64 del registro <AUDIO> a bytes reales de MP3
byte[] audioBytes = Convert.FromBase64String(audioBase64);

// 2. Guarda el MP3 en la carpeta temporal de Windows (sin ensuciar tu proyecto)
string tempPath = Path.Combine(Path.GetTempPath(), "audio_bgm.mp3");
File.WriteAllBytes(tempPath, audioBytes);`

const AUDIO_PLAYER_CODE = `using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

// Compatible desde .NET Framework 4.x hasta .NET 10 — CERO paquetes NuGet
public static class AudioPlayer
{
    [DllImport("winmm.dll")]
    private static extern int mciSendString(
        string command,
        StringBuilder buffer,
        int bufferSize,
        IntPtr hwnd);

    public static void ReproducirBase64(string base64Mp3)
    {
        string tempPath = Path.Combine(Path.GetTempPath(), "audio_bgm.mp3");
        File.WriteAllBytes(tempPath, Convert.FromBase64String(base64Mp3));

        mciSendString("close bgm", null, 0, IntPtr.Zero);
        mciSendString("open \\"" + tempPath + "\\" type mpegvideo alias bgm", null, 0, IntPtr.Zero);
        mciSendString("play bgm repeat", null, 0, IntPtr.Zero);
    }

    public static void Detener()
    {
        mciSendString("close bgm", null, 0, IntPtr.Zero);
    }
}`

const USAGE_IN_FORM_CODE = `// Al abrir el Carousel (Fase 6), inicia la música en bucle
AudioPlayer.ReproducirBase64(audioBase64);

// Al cerrar la ventana, detén siempre el audio para no dejarlo sonando en segundo plano
private void Form1_FormClosing(object sender, FormClosingEventArgs e)
{
    AudioPlayer.Detener();
}`

export function AudioBase64Page({ onBack }: AudioBase64PageProps) {
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
            Guía Práctica · C# Windows Forms (Sin NuGet)
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            De Texto <span className="text-vice-pink">Base64</span> a{" "}
            <span className="text-vice-orange">Audio MP3</span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Al igual que las imágenes, la pista de audio viaja codificada en{" "}
            <strong className="font-semibold text-foreground">Base64</strong>{" "}
            dentro del registro{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              &lt;AUDIO&gt;
            </code>
            . Para reproducir{" "}
            <code className="font-mono text-sm text-vice-orange">.mp3</code> en
            bucle sin instalar paquetes NuGet, se escribe a un archivo temporal
            y se utiliza la librería nativa de Windows{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-vice-pink">
              winmm.dll
            </code>
            .
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            1. Decodificar Base64 y guardar el MP3 temporal
          </h2>
          <CodeBlock code={SAVE_AUDIO_CODE} filename="GuardarAudio.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            2. Clase auxiliar lista para usar (
            <code className="font-mono text-vice-pink">AudioPlayer.cs</code>)
          </h2>
          <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
            Puedes copiar esta clase directamente en tu proyecto. Reproduce en
            bucle en segundo plano sin congelar la interfaz de Windows Forms:
          </p>
          <CodeBlock code={AUDIO_PLAYER_CODE} filename="AudioPlayer.cs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            3. Iniciar y detener en el formulario
          </h2>
          <CodeBlock code={USAGE_IN_FORM_CODE} filename="Form1.cs" />
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
