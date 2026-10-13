export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="eyebrow flex items-center justify-start gap-3">
      <span aria-hidden className="h-px w-5 bg-accent" />
      {children}
    </p>
  )
}

export const sectionHeadingClass =
  'text-[clamp(2.25rem,1.4rem+3.2vw,3.75rem)] leading-[1.02]'
