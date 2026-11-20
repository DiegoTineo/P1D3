import type { ReactNode } from "react"

interface AtmosphericBandProps {
  imageSrc: string
  children: ReactNode
}

export function AtmosphericBand({ imageSrc, children }: AtmosphericBandProps) {
  return (
    <div className="relative w-full overflow-hidden bg-background py-14 sm:py-20">
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#09090B_0%,rgba(9,9,11,0.58)_20%,rgba(9,9,11,0.58)_80%,#09090B_100%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-5 sm:px-8">
        {children}
      </div>
    </div>
  )
}
