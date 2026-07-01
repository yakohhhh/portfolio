import { FadeUp, Kicker, MaskReveal } from './ui'

type Props = {
  label: string
  title: string
  subtitle?: string
}

/** En-tête de section éditorial (penra) : (LABEL) + gros titre grotesque. */
export default function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <div className="mb-12 max-w-3xl sm:mb-16">
      <FadeUp>
        <Kicker>{label}</Kicker>
      </FadeUp>
      <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.03em] text-ink-900 sm:text-5xl md:text-6xl">
        <MaskReveal>{title}</MaskReveal>
      </h2>
      {subtitle && (
        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">{subtitle}</p>
        </FadeUp>
      )}
    </div>
  )
}
