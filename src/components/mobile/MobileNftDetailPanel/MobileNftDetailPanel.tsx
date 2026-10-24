import type { MobileNftDetailPanelProps } from '@/types/mobile'

export function MobileNftDetailPanel({
  title,
  priceLabel,
  editionLabel,
  description,
  buyLabel,
  favoriteLabel,
}: MobileNftDetailPanelProps) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4 rounded-t-2xl bg-surface-card p-6">
      <div className="flex items-start justify-between gap-4">
        <h1 className="font-mono text-xl font-bold leading-6 text-foreground">{title}</h1>
        <p className="font-mono text-lg font-bold leading-4 text-text-accent">{priceLabel}</p>
      </div>
      <p className="font-mono text-sm leading-4 text-secondary">{editionLabel}</p>
      <p className="font-mono text-sm leading-6 text-text-secondary">{description}</p>
      <div className="flex gap-2">
        <button
          className="flex h-10 flex-1 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-ink"
          type="button"
        >
          {buyLabel}
        </button>
        <button
          className="flex h-10 flex-1 items-center justify-center rounded-md border border-primary font-mono text-sm font-medium text-text-accent"
          type="button"
        >
          {favoriteLabel}
        </button>
      </div>
    </section>
  )
}
