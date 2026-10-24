import { useEffect, useRef } from 'react'

import { CheckoutReceiptItemRow } from '@/components/checkout/CheckoutReceiptItemRow/CheckoutReceiptItemRow'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { OrderConfirmationMetaItem, OrderConfirmationModalProps } from '@/types/order'

type OrderConfirmationMetaCellProps = {
  item: OrderConfirmationMetaItem
}

function OrderConfirmationMetaCell({ item }: OrderConfirmationMetaCellProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-base leading-4 text-foreground">{item.label}</p>
      <p className="font-mono text-base leading-5 text-foreground">{item.value}</p>
    </div>
  )
}

export function OrderConfirmationModal({
  successTitle,
  metaItems,
  detailsTitle,
  tableNftsLabel,
  tableEditionsLabel,
  tableSubtotalLabel,
  receiptItems,
  networkFeeLabel,
  networkFeeValueLabel,
  totalLabel,
  totalValueLabel,
  confirmationNote,
  etherscanLabel,
  closeAriaLabel,
  closeIconSrc,
  onEtherscanClick,
  onCloseClick,
}: OrderConfirmationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  const metaCells = metaItems.map((item) => (
    <OrderConfirmationMetaCell item={item} key={item.id} />
  ))

  const receiptRows = receiptItems.map((item) => (
    <li key={item.id}>
      <CheckoutReceiptItemRow item={item} />
    </li>
  ))

  return (
    <div
      aria-label={successTitle}
      aria-modal="true"
      className="relative flex w-full max-w-[578px] flex-col bg-surface-card"
      role="dialog"
    >
      <Button
        ref={closeButtonRef}
        aria-label={closeAriaLabel}
        className="absolute right-4 top-4 size-[18px]"
        type="button"
        onClick={onCloseClick}
      >
        <img alt="" className="size-[18px]" src={closeIconSrc} />
      </Button>

      <header className="flex flex-col items-center gap-4 px-8 pb-6 pt-6 text-center">
        <div aria-hidden className="size-20 rounded-full bg-primary" />
        <p className="font-mono text-base leading-4 text-foreground">{successTitle}</p>
      </header>

      <Separator />

      <div className="flex justify-between gap-4 px-9 py-4">{metaCells}</div>

      <Separator />

      <div className="flex flex-col gap-4 px-11 py-5">
        <h2 className="font-mono text-base font-bold leading-4 text-foreground">{detailsTitle}</h2>
        <div className="flex justify-between font-mono text-base leading-4 text-foreground">
          <p>{tableNftsLabel}</p>
          <div className="flex gap-12">
            <p>{tableEditionsLabel}</p>
            <p>{tableSubtotalLabel}</p>
          </div>
        </div>
        <Separator />
        <ul className="flex flex-col gap-3">{receiptRows}</ul>
        <div className="ml-auto flex w-full max-w-[321px] flex-col gap-3 font-mono text-foreground">
          <div className="flex justify-between">
            <span>{networkFeeLabel}</span>
            <span>{networkFeeValueLabel}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>{totalLabel}</span>
            <span className="text-text-accent">{totalValueLabel}</span>
          </div>
        </div>
        <Separator />
        <p className="font-mono text-sm leading-[22px] text-text-secondary">{confirmationNote}</p>
        <Button
          className="mx-auto flex h-12 w-[186px] items-center justify-center rounded-sm border border-border font-mono text-base leading-4 text-foreground"
          type="button"
          onClick={onEtherscanClick}
        >
          {etherscanLabel}
        </Button>
      </div>

      <div aria-hidden className="h-2.5 w-full bg-primary" />
    </div>
  )
}
