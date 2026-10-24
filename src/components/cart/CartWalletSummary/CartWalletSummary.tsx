import type { ChangeEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { mergeClassNames } from '@/utils/mergeClassNames'
import type { CartWalletSummaryProps } from '@/types/cart'

export function CartWalletSummary({
  title,
  promoCodeTitle,
  promoCodePlaceholder,
  promoCodeValue,
  promoApplyLabel,
  subtotalLabel,
  subtotalValueLabel,
  discountLabel,
  discountValueLabel,
  networkFeeLabel,
  networkFeeValueLabel,
  networkFeeHintLabel,
  totalLabel,
  totalValueLabel,
  checkoutLabel,
  continueShoppingLabel,
  onPromoCodeChange,
  onPromoApplyClick,
  onCheckoutClick,
  onContinueShoppingClick,
}: CartWalletSummaryProps) {
  const hasPromoInput = onPromoCodeChange !== undefined
  const promoInputValue = promoCodeValue ?? ''

  const handlePromoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onPromoCodeChange?.(event.target.value)
  }

  const promoFieldElement = hasPromoInput ? (
    <Input
      className="min-w-0 flex-1 bg-transparent pl-2 font-mono text-xs font-normal leading-4 text-foreground outline-none placeholder:text-secondary"
      placeholder={promoCodePlaceholder}
      type="text"
      value={promoInputValue}
      onChange={handlePromoInputChange}
    />
  ) : (
    <p className="flex min-w-0 flex-1 items-center pl-2 font-mono text-xs font-normal leading-4 text-secondary">
      {promoCodePlaceholder}
    </p>
  )

  const primaryButtonClassName = mergeClassNames(
    'flex h-10 w-full items-center justify-center rounded-sm bg-primary font-mono text-[15px] font-bold leading-4 text-ink',
    'cursor-pointer transition-colors duration-150 hover:bg-copper-hover',
  )

  const continueButtonClassName = mergeClassNames(
    'font-mono text-[15px] font-normal leading-none text-text-accent',
    'cursor-pointer transition-opacity duration-150 hover:opacity-80',
  )

  const promoApplyButtonClassName = mergeClassNames(
    'flex h-10 w-[102px] items-center justify-center bg-primary font-mono text-[15px] font-bold leading-4 text-ink',
    'cursor-pointer transition-colors duration-150 hover:bg-copper-hover',
  )

  return (
    <aside className="flex w-full min-w-0 flex-col gap-6 lg:w-[min(332px,34%)] lg:shrink-0">
      <div className="flex flex-col gap-3">
        <h2 className="font-mono text-lg font-bold leading-4 text-foreground">{title}</h2>
        <Separator />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-mono text-sm font-bold leading-4 text-foreground">{promoCodeTitle}</p>
        <div className="flex h-10 w-full overflow-hidden rounded-sm border border-primary">
          {promoFieldElement}
          <Button className={promoApplyButtonClassName} type="button" onClick={onPromoApplyClick}>
            {promoApplyLabel}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 font-mono text-[15px] font-normal text-foreground">
        <div className="flex items-start justify-between">
          <p>{subtotalLabel}</p>
          <p className="text-lg leading-4">{subtotalValueLabel}</p>
        </div>
        <div className="flex items-start justify-between">
          <p>{discountLabel}</p>
          <p>{discountValueLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex w-full items-center justify-between">
            <p>{networkFeeLabel}</p>
            <p className="text-lg leading-4">{networkFeeValueLabel}</p>
          </div>
          <p className="text-xs leading-4 text-text-accent">{networkFeeHintLabel}</p>
        </div>
      </div>

      <div className="flex items-start justify-between font-mono font-bold leading-4">
        <p className="text-base text-foreground">{totalLabel}</p>
        <p className="text-lg text-text-accent">{totalValueLabel}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button className={primaryButtonClassName} type="button" onClick={onCheckoutClick}>
          {checkoutLabel}
        </Button>
        <Button className={continueButtonClassName} type="button" onClick={onContinueShoppingClick}>
          {continueShoppingLabel}
        </Button>
      </div>
    </aside>
  )
}
