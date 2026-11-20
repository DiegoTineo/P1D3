export function VisualFooterBanner() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-10 h-56 w-full overflow-hidden sm:h-64"
    >
      <img
        src="./footer-palms.jpg"
        alt=""
        loading="lazy"
        className="h-full w-full object-cover object-center opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#09090B_0%,rgba(9,9,11,0.55)_32%,rgba(9,9,11,0.12)_72%,rgba(9,9,11,0.35)_100%)]" />
    </div>
  )
}
