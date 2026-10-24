import type { CheckoutReceiptItem } from '@/types/checkout'

type CheckoutReceiptItemRowProps = {
  item: CheckoutReceiptItem
}

export function CheckoutReceiptItemRow({ item }: CheckoutReceiptItemRowProps) {
  const imageStyle = {
    width: item.imageSize,
    height: item.imageSize,
  }

  return (
    <article className="flex h-[70px] w-full items-center gap-2 bg-surface-card pl-1 pr-4">
      <img
        alt={item.imageAlt}
        className="shrink-0 rounded-lg object-cover"
        src={item.imageSrc}
        style={imageStyle}
      />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-base font-bold leading-4 text-foreground">{item.name}</p>
        <p className="font-mono text-sm font-normal leading-4 text-secondary">{item.tokenIdLabel}</p>
      </div>
      <p className="font-mono text-sm font-normal leading-4 text-text-secondary">
        {item.quantityLabel}
      </p>
      <p className="font-mono text-lg font-bold leading-4 text-text-accent">{item.subtotalLabel}</p>
    </article>
  )
}
