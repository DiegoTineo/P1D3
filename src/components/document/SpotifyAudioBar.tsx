import { useEffect, useRef, useState } from "react"
import {
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"
import { cn } from "cn"
import { AudioVisualizer } from "@/components/document/AudioVisualizer"

interface PlaylistTrack {
  src: string
  title: string
  artist: string
  cover: string
}

const PLAYLIST: readonly PlaylistTrack[] = [
  {
    src: "./musicaLQ.mp3",
    title: "Flower In A Hurricane",
    artist: "Justice · ft. Tame Impala, SZA & King Gizzard",
    cover: "./flower-in-a-hurricane.jpg",
  },
  {
    src: "./musicaLQ2.mp3",
    title: "Starting From Zero",
    artist: "Justice · feat. Michael McDonald",
    cover: "./flower-in-a-hurricane.jpg",
  },
  {
    src: "./musicaLQ3.mp3",
    title: "Around the World",
    artist: "Daft Punk · 1997",
    cover: "./flower-in-a-hurricane.jpg",
  },
] as const

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00"
  }
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function SpotifyAudioBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const trackIndexRef = useRef(0)
  const isLoopingRef = useRef(true)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.55)
  const [isMuted, setIsMuted] = useState(false)

  const currentTrack = PLAYLIST[trackIndex]

  const ensureAudioAnalyser = (audio: HTMLAudioElement) => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        void audioCtxRef.current.resume()
      }
      return
    }
    const ctx = new AudioContext()
    const source = ctx.createMediaElementSource(audio)
    const nextAnalyser = ctx.createAnalyser()
    nextAnalyser.fftSize = 128
    nextAnalyser.smoothingTimeConstant = 0.8
    source.connect(nextAnalyser)
    nextAnalyser.connect(ctx.destination)
    audioCtxRef.current = ctx
    setAnalyser(nextAnalyser)
  }

  const loadTrack = async (nextIndex: number, autoPlay: boolean) => {
    const audio = audioRef.current
    if (!audio) return

    const normalized = ((nextIndex % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length
    trackIndexRef.current = normalized
    setTrackIndex(normalized)
    setCurrentTime(0)
    setDuration(0)

    audio.src = PLAYLIST[normalized].src
    audio.load()

    if (autoPlay) {
      try {
        ensureAudioAnalyser(audio)
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    }
  }

  useEffect(() => {
    const audio = new Audio(PLAYLIST[0].src)
    audio.preload = "metadata"
    audio.loop = false
    audio.volume = 0.55
    audioRef.current = audio

    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
    const onPlay = () => {
      ensureAudioAnalyser(audio)
      setIsPlaying(true)
    }
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      const next = trackIndexRef.current + 1
      if (next < PLAYLIST.length) {
        void loadTrack(next, true)
      } else if (isLoopingRef.current) {
        void loadTrack(0, true)
      } else {
        setIsPlaying(false)
      }
    }

    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.removeEventListener("ended", onEnded)
      audio.pause()
      audio.src = ""
      audioRef.current = null
      if (audioCtxRef.current) {
        void audioCtxRef.current.close()
        audioCtxRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!("mediaSession" in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
    })
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      const audio = audioRef.current
      if (!audio) return
      void loadTrack(trackIndexRef.current - 1, !audio.paused)
    })
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      const audio = audioRef.current
      if (!audio) return
      void loadTrack(trackIndexRef.current + 1, !audio.paused)
    })
  }, [currentTrack])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
    } else {
      try {
        ensureAudioAnalyser(audio)
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    }
  }

  const handleSeek = (nextTime: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handlePreviousTrack = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.currentTime > 3) {
      handleSeek(0)
      return
    }
    void loadTrack(trackIndexRef.current - 1, !audio.paused)
  }

  const handleNextTrack = () => {
    const audio = audioRef.current
    if (!audio) return
    void loadTrack(trackIndexRef.current + 1, !audio.paused)
  }

  const toggleLoop = () => {
    const next = !isLooping
    isLoopingRef.current = next
    setIsLooping(next)
  }

  const handleVolumeChange = (nextVolume: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = nextVolume
    setVolume(nextVolume)
    if (nextVolume > 0 && isMuted) {
      audio.muted = false
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    const nextMuted = !isMuted
    audio.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const effectiveVolume = isMuted ? 0 : volume

  return (
    <aside
      aria-label="Reproductor de música"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-[#0B0A0F]/95 backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-1.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.8fr)] sm:px-8">
        {/* Track info */}
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={currentTrack.cover}
            alt={`Portada de ${currentTrack.title}`}
            className="size-10 shrink-0 rounded border border-border/70 object-cover shadow-sm"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
              {currentTrack.title}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Center controls + progress */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={toggleLoop}
              aria-label={isLooping ? "Desactivar repetición de lista" : "Activar repetición de lista"}
              aria-pressed={isLooping}
              className={cn(
                "hidden transition-colors sm:inline-flex",
                isLooping
                  ? "text-vice-pink"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Repeat className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={handlePreviousTrack}
              aria-label="Canción anterior"
              className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
            >
              <SkipBack className="size-3.5 fill-current" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="flex size-7 items-center justify-center rounded-full bg-white text-black shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="size-3.5 fill-current" />
              ) : (
                <Play className="size-3.5 fill-current" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNextTrack}
              aria-label="Siguiente canción"
              className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
            >
              <SkipForward className="size-3.5 fill-current" />
            </button>
          </div>

          <div className="hidden w-full max-w-lg items-center gap-2 sm:flex">
            <span className="w-8 text-right font-mono text-[10px] text-muted-foreground tabular-nums">
              {formatTime(currentTime)}
            </span>

            <div className="group relative flex h-3 flex-1 items-center">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-vice-magenta via-vice-pink to-vice-orange transition-[width] duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                aria-label="Progreso de la canción"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            <span className="w-8 font-mono text-[10px] text-muted-foreground tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right visualizer + volume control */}
        <div className="hidden items-center justify-end gap-4 sm:flex">
          <AudioVisualizer analyser={analyser} isPlaying={isPlaying} />

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>

            <div className="relative flex h-4 w-24 items-center">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-white/85"
                  style={{ width: `${effectiveVolume * 100}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={effectiveVolume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                aria-label="Volumen"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
