import { Button } from '@/components/ui/button'
import { mergeClassNames } from '@/utils/mergeClassNames'
import type { MobileCheckoutPanelProps, MobileWalletOption } from '@/types/mobile'

type MobileWalletOptionRowProps = {
  option: MobileWalletOption
}

function MobileWalletOptionRow({ option }: MobileWalletOptionRowProps) {
  const rowClassName = mergeClassNames(
    'flex h-[65px] w-full items-center gap-4 rounded-md border px-3.5',
    option.isSelected ? 'border-primary' : 'border-border',
  )

  return (
    <div className={rowClassName}>
      <div className="flex size-10 items-center justify-center rounded-full bg-surface-dark font-mono text-lg font-bold text-text-accent">
        {option.markLabel}
      </div>
      <p className="font-mono text-base leading-4 text-foreground">{option.label}</p>
    </div>
  )
}

export function MobileCheckoutPanel({
  breadcrumbLabel,
  collectorTitle,
  emailPlaceholder,
  networkPlaceholder,
  walletPlaceholder,
  selectArrowIconSrc,
  walletOptions,
  totalPrefixLabel,
  totalValueLabel,
  confirmLabel,
}: MobileCheckoutPanelProps) {
  const walletOptionRows = walletOptions.map((option) => (
    <li key={option.id}>
      <MobileWalletOptionRow option={option} />
    </li>
  ))

  const selectFieldClassName =
    'flex h-10 w-full items-center justify-between rounded-sm border border-border px-3 font-mono text-sm text-secondary'

  return (
    <section className="flex w-full min-w-0 flex-col gap-6">
      <p className="font-mono text-sm text-secondary">{breadcrumbLabel}</p>
      <h2 className="font-mono text-base font-bold text-foreground">{collectorTitle}</h2>
      <div className={selectFieldClassName}>
        <span>{emailPlaceholder}</span>
      </div>
      <div className={selectFieldClassName}>
        <span>{networkPlaceholder}</span>
        <img alt="" className="size-5" src={selectArrowIconSrc} />
      </div>
      <div className={selectFieldClassName}>
        <span>{walletPlaceholder}</span>
        <img alt="" className="size-5" src={selectArrowIconSrc} />
      </div>
      <ul className="flex flex-col gap-4">{walletOptionRows}</ul>
      <div className="flex justify-end gap-2 font-mono text-base text-foreground">
        <span>{totalPrefixLabel}</span>
        <span className="font-bold text-text-accent">{totalValueLabel}</span>
      </div>
      <Button
        className="flex h-[60px] w-full items-center justify-center rounded-md bg-primary font-mono text-base font-bold text-ink"
        type="button"
      >
        {confirmLabel}
      </Button>
    </section>
  )
}
