import type { HomeFooterFeature } from '@/types/homeFooter'

export function HomeFooterFeature({ medallionLabel, title, description }: HomeFooterFeature) {
  return (
    <article className="flex flex-col items-start gap-3 px-4">
      <div className="flex size-[74px] items-center justify-center rounded-full bg-primary font-mono text-2xl font-bold text-ink">
        {medallionLabel}
      </div>
      <h3 className="font-mono text-[17px] font-bold leading-4 text-foreground">{title}</h3>
      <p className="w-full min-w-0 font-mono text-sm font-normal leading-[22px] text-text-secondary">
        {description}
      </p>
    </article>
  )
}
