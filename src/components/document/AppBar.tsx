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
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6 sm:px-10">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onNavigate("home")
          }}
          className="relative inline-block font-[family-name:var(--font-display)] text-xl tracking-wider uppercase sm:text-2xl"
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

        <div className="flex items-center gap-7 text-sm font-medium">
          {NAV_ITEMS.map(({ route, href, label }) => {
            const isActive = currentRoute === route
            return (
              <a
                key={route}
                href={href}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(route)
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
      </div>
    </nav>
  )
}
