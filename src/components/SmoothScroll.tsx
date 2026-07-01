import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

/** Smooth-scroll global (Lenis), façon penra. Les composants enfants peuvent
 *  appeler useLenis() de 'lenis/react' pour un scroll fluide vers une ancre. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, duration: 1.15, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.5 }}
    >
      {children}
    </ReactLenis>
  )
}
