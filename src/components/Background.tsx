/** Fond global éditorial : crème plat + grain papier très discret. */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-paper-50" />
      <div className="grain absolute inset-0 opacity-[0.5]" />
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(26,24,19,0.035),transparent)]" />
    </div>
  )
}
