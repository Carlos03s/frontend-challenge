import type { SectionHeadingProps } from '@/types/account'

export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h2 className="font-mono text-lg font-bold leading-4 text-foreground">{title}</h2>
      <div className="h-px w-full bg-border" />
    </div>
  )
}
