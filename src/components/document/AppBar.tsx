import { useEffect, useState, type ComponentType } from "react"
import { Boxes, GraduationCap, Home, LifeBuoy, Menu, X } from "lucide-react"
import { cn } from "cn"

export type AppRoute =
  | "home"
  | "tdas"
  | "ayuda"
  | "generic-types"
  | "string-builder"
  | "imagenes-base64"
  | "audio-base64"
  | "leer-archivo"
  | "que-aprendo"

interface AppBarProps {
  currentRoute: AppRoute
  onNavigate: (route: AppRoute) => void
}

interface NavItem {
  route: AppRoute
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}

const HELP_SUBROUTES: AppRoute[] = [
  "ayuda",
  "leer-archivo",
  "generic-types",
  "string-builder",
  "imagenes-base64",
  "audio-base64",
]

const NAV_ITEMS: NavItem[] = [
  { route: "home", href: "#", label: "Inicio", icon: Home },
  { route: "tdas", href: "#/tdas", label: "TDAs", icon: Boxes },
  { route: "ayuda", href: "#/ayuda", label: "Ayuda", icon: LifeBuoy },
  {
    route: "que-aprendo",
    href: "#/que-aprendo",
    label: "¿Qué aprendo?",
    icon: GraduationCap,
  },
]

function isNavItemActive(itemRoute: AppRoute, currentRoute: AppRoute): boolean {
  if (itemRoute === "ayuda") {
    return HELP_SUBROUTES.includes(currentRoute)
  }
  return currentRoute === itemRoute
}

interface NavLinksProps {
  currentRoute: AppRoute
  onSelect: (route: AppRoute) => void
  variant: "desktop" | "mobile"
}

function NavLinks({ currentRoute, onSelect, variant }: NavLinksProps) {
  const isMobile = variant === "mobile"

  return (
    <div
      className={cn(
        "flex text-sm font-medium",
        isMobile ? "flex-col gap-1" : "items-center gap-7"
      )}
    >
      {NAV_ITEMS.map(({ route, href, label, icon: Icon }) => {
        const isActive = isNavItemActive(route, currentRoute)

        return (
          <a
            key={route}
            href={href}
            onClick={(e) => {
              e.preventDefault()
              onSelect(route)
            }}
            className={cn(
              "group relative inline-flex items-center gap-2 transition-colors duration-200",
              isMobile ? "w-fit py-2.5" : "py-1",
              isActive
                ? "text-vice-pink"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors duration-200",
                isActive
                  ? "text-vice-pink"
                  : "text-muted-foreground group-hover:text-vice-orange"
              )}
            />
            <span>{label}</span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-vice-magenta via-vice-pink to-vice-orange transition-transform duration-300 ease-out",
                isMobile ? "bottom-1" : "-bottom-0.5",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
            />
          </a>
        )
      })}
    </div>
  )
}

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
        <div className="hidden md:block">
          <NavLinks
            currentRoute={currentRoute}
            onSelect={handleSelect}
            variant="desktop"
          />
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
          <NavLinks
            currentRoute={currentRoute}
            onSelect={handleSelect}
            variant="mobile"
          />
        </div>
      )}
    </nav>
  )
}
