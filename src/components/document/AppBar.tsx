import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "cn"

export type AppRoute =
  | "home"
  | "generic-types"
  | "string-builder"
  | "imagenes-base64"
  | "audio-base64"
  | "que-aprendo"

interface AppBarProps {
  currentRoute: AppRoute
  onNavigate: (route: AppRoute) => void
}

const NAV_ITEMS: { route: AppRoute; href: string; label: string }[] = [
  { route: "home", href: "#", label: "Proyecto 1" },
  { route: "generic-types", href: "#/generic-types", label: "Generic Types" },
  { route: "string-builder", href: "#/string-builder", label: "StringBuilder" },
  { route: "que-aprendo", href: "#/que-aprendo", label: "¿Qué aprendo?" },
]

export function AppBar({ currentRoute, onNavigate }: AppBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  const handleSelect = (route: AppRoute) => {
    setMobileOpen(false)
    onNavigate(route)
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6 sm:px-10">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handleSelect("home")
          }}
          className="relative inline-block shrink-0 font-[family-name:var(--font-display)] text-xl tracking-wider uppercase sm:text-2xl"
          aria-label="DATOS III — Inicio"
        >
          <span
            aria-hidden="true"
            className="gta-logo-stroke pointer-events-none absolute inset-0 select-none"
          >
            DATOS III
          </span>
          <span className="gta-title-image-fill relative">DATOS III</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          {NAV_ITEMS.map(({ route, href, label }) => {
            const isActive = currentRoute === route
            return (
              <a
                key={route}
                href={href}
                onClick={(e) => {
                  e.preventDefault()
                  handleSelect(route)
                }}
                className={cn(
                  "group relative py-1 transition-colors duration-200",
                  isActive
                    ? "text-vice-pink"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-vice-magenta via-vice-pink to-vice-orange transition-transform duration-300 ease-out",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </a>
            )
          })}
        </div>

        {/* Mobile hamburger trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex size-9 items-center justify-center rounded-md text-foreground/85 transition-colors hover:bg-muted hover:text-vice-pink md:hidden"
        >
          <span className="relative size-5">
            <Menu
              className={cn(
                "absolute inset-0 size-5 transition-all duration-300 ease-out motion-reduce:transition-none",
                mobileOpen
                  ? "rotate-180 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              )}
            />
            <X
              className={cn(
                "absolute inset-0 size-5 transition-all duration-300 ease-out motion-reduce:transition-none",
                mobileOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-180 scale-0 opacity-0"
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="animate-in fade-in slide-in-from-top-2 duration-200 border-t border-border/70 bg-[#0B0A0F]/95 px-6 py-3 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ route, href, label }) => {
              const isActive = currentRoute === route
              return (
                <a
                  key={route}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSelect(route)
                  }}
                  className={cn(
                    "border-l-2 px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-vice-pink bg-card/70 text-vice-pink"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-card/40 hover:text-foreground"
                  )}
                >
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
