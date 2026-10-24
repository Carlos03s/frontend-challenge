import { ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react'
import type { ChangeEvent } from 'react'

import type { CartItemsPanelProps, CartWalletSummaryProps } from '@/types/cart'

export type MobileCartScreenProps = {
  title: string
  itemRows: CartItemsPanelProps['itemRows']
  summary: CartWalletSummaryProps
  onBackClick: () => void
}

export function MobileCartScreen({ title, itemRows, summary, onBackClick }: MobileCartScreenProps) {
  const itemElements = itemRows.map((itemRow) => (
    <li key={`${itemRow.name}-${itemRow.tokenIdLabel}`}>
      <article className="flex gap-3 rounded-2xl bg-surface-card p-3">
        <img
          alt={itemRow.imageAlt}
          className="size-16 shrink-0 rounded-xl object-cover"
          src={itemRow.imageSrc}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate font-mono text-sm font-bold text-foreground">{itemRow.name}</p>
          <p className="font-mono text-xs text-secondary">{itemRow.tokenIdLabel}</p>
          <p className="font-mono text-sm font-bold text-text-accent">{itemRow.lineTotalLabel}</p>
        </div>
        <div className="flex items-center gap-2 self-center">
          <button
            aria-label={itemRow.decreaseQuantityAriaLabel}
            className="flex size-7 cursor-pointer items-center justify-center text-foreground"
            type="button"
            onClick={itemRow.onDecreaseQuantityClick}
          >
            <Minus aria-hidden size={14} />
          </button>
          <span className="font-mono text-sm text-foreground">{itemRow.quantityLabel}</span>
          <button
            aria-label={itemRow.increaseQuantityAriaLabel}
            className="flex size-7 cursor-pointer items-center justify-center text-foreground"
            type="button"
            onClick={itemRow.onIncreaseQuantityClick}
          >
            <Plus aria-hidden size={14} />
          </button>
          <button
            aria-label={itemRow.removeAriaLabel}
            className="flex size-7 cursor-pointer items-center justify-center text-text-accent"
            type="button"
            onClick={itemRow.onRemoveClick}
          >
            <Trash2 aria-hidden size={14} />
          </button>
        </div>
      </article>
    </li>
  ))

  const handlePromoChange = (event: ChangeEvent<HTMLInputElement>) => {
    summary.onPromoCodeChange?.(event.target.value)
  }

  return (
    <section className="flex w-full flex-col gap-4 lg:hidden">
      <div className="relative flex items-center justify-center">
        <button
          aria-label="Voltar"
          className="absolute left-0 flex size-10 cursor-pointer items-center justify-center text-foreground"
          type="button"
          onClick={onBackClick}
        >
          <ChevronLeft aria-hidden size={20} />
        </button>
        <h1 className="font-mono text-base font-bold text-foreground">{title}</h1>
      </div>

      <ul className="flex flex-col gap-3">{itemElements}</ul>

      <div className="flex h-12 overflow-hidden rounded-full border border-primary">
        <input
          className="min-w-0 flex-1 bg-transparent px-4 font-mono text-xs text-foreground outline-none placeholder:text-secondary"
          placeholder={summary.promoCodePlaceholder}
          type="text"
          value={summary.promoCodeValue ?? ''}
          onChange={handlePromoChange}
        />
        <button
          className="cursor-pointer rounded-full bg-primary px-5 font-mono text-sm font-bold text-ink"
          type="button"
          onClick={summary.onPromoApplyClick}
        >
          {summary.promoApplyLabel}
        </button>
      </div>

      <div className="flex flex-col gap-2 font-mono text-sm text-foreground">
        <div className="flex justify-between">
          <p>{summary.subtotalLabel}</p>
          <p>{summary.subtotalValueLabel}</p>
        </div>
        <div className="flex justify-between">
          <p>{summary.discountLabel}</p>
          <p>{summary.discountValueLabel}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p>{summary.networkFeeLabel}</p>
            <p className="text-xs text-text-accent">{summary.networkFeeHintLabel}</p>
          </div>
          <p>{summary.networkFeeValueLabel}</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>{summary.totalLabel}</p>
          <p className="text-text-accent">{summary.totalValueLabel}</p>
        </div>
      </div>

      <button
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-primary font-mono text-base font-bold text-ink"
        type="button"
        onClick={summary.onCheckoutClick}
      >
        {summary.checkoutLabel}
      </button>
    </section>
  )
}
