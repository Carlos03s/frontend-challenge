import type { CartItemRowProps } from '@/types/cart'

export function CartItemRow({
  name,
  tokenIdLabel,
  imageSrc,
  imageAlt,
  unitPriceLabel,
  quantityLabel,
  lineTotalLabel,
  decreaseQuantityAriaLabel,
  increaseQuantityAriaLabel,
  removeAriaLabel,
  decreaseIconSrc,
  increaseIconSrc,
  removeIconSrc,
  onDecreaseQuantityClick,
  onIncreaseQuantityClick,
  onRemoveClick,
}: CartItemRowProps) {
  return (
    <article className="grid h-[70px] w-full min-w-0 grid-cols-[minmax(0,1fr)_4.5rem_6.5rem_5.5rem_1.5rem] items-center bg-surface-card">
      <div className="flex min-w-0 items-center gap-4">
        <img
          alt={imageAlt}
          className="size-[70px] rounded-md object-cover"
          src={imageSrc}
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="truncate font-mono text-base font-bold leading-4 text-foreground">{name}</p>
          <p className="truncate font-mono text-sm font-normal leading-4 text-secondary">{tokenIdLabel}</p>
        </div>
      </div>

      <p className="text-center font-mono text-base font-bold leading-4 text-text-secondary">
        {unitPriceLabel}
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          aria-label={decreaseQuantityAriaLabel}
          className="flex h-[30px] w-5 items-center justify-center rounded-[20px] border border-ink bg-primary shadow-[0_4px_6px_rgba(20,13,10,0.15)]"
          type="button"
          onClick={onDecreaseQuantityClick}
        >
          <img alt="" className="size-4" src={decreaseIconSrc} />
        </button>
        <p className="font-mono text-[17px] font-normal leading-6 text-foreground">{quantityLabel}</p>
        <button
          aria-label={increaseQuantityAriaLabel}
          className="flex h-[30px] w-5 items-center justify-center rounded-[20px] border border-ink bg-primary shadow-[0_4px_6px_rgba(20,13,10,0.15)]"
          type="button"
          onClick={onIncreaseQuantityClick}
        >
          <img alt="" className="size-4" src={increaseIconSrc} />
        </button>
      </div>

      <p className="text-center font-mono text-base font-bold leading-4 text-text-accent">
        {lineTotalLabel}
      </p>

      <button
        aria-label={removeAriaLabel}
        className="size-6"
        type="button"
        onClick={onRemoveClick}
      >
        <img alt="" className="size-6" src={removeIconSrc} />
      </button>
    </article>
  )
}
