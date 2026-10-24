import { ChevronLeft, Heart, Minus, Plus, ShoppingCart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { mergeClassNames } from '@/utils/mergeClassNames'
import type { NftDetailProductProps } from '@/types/nftDetail'

export type MobileNftDetailScreenProps = NftDetailProductProps & {
  onBackClick: () => void
}

export function MobileNftDetailScreen({
  galleryProps,
  purchasePanelProps,
  onBackClick,
}: MobileNftDetailScreenProps) {
  const editionChips = purchasePanelProps.editionOptions.map((editionOption) => {
    const chipClassName = mergeClassNames(
      'rounded-full border px-3 py-1 font-mono text-xs leading-4',
      editionOption.isActive
        ? 'border-primary text-text-accent'
        : 'border-border text-secondary',
    )

    const handleEditionClick = () => {
      purchasePanelProps.onEditionOptionClick?.(editionOption.id)
    }

    return (
      <li key={editionOption.id}>
        <button className={chipClassName} type="button" onClick={handleEditionClick}>
          {editionOption.label}
        </button>
      </li>
    )
  })

  const hasAvailabilityMessage =
    purchasePanelProps.availabilityMessage !== undefined &&
    purchasePanelProps.availabilityMessage.length > 0
  const mobileAvailabilityElement = hasAvailabilityMessage ? (
    <p className="font-mono text-sm text-text-accent">{purchasePanelProps.availabilityMessage}</p>
  ) : null

  return (
    <section className="flex w-full flex-col gap-4 lg:hidden">
      <div className="flex items-center justify-between">
        <button
          aria-label="Voltar"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground"
          type="button"
          onClick={onBackClick}
        >
          <ChevronLeft aria-hidden size={18} />
        </button>
        <Button
          aria-label={purchasePanelProps.favoriteLabel}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground"
          type="button"
          onClick={purchasePanelProps.onFavoriteClick}
        >
          <Heart aria-hidden size={18} />
        </Button>
      </div>

      <img
        alt={galleryProps.mainImageAlt}
        className="aspect-square w-full rounded-3xl object-cover"
        decoding="async"
        fetchPriority="high"
        src={galleryProps.mainImageSrc}
      />

      <div className="flex items-start justify-between gap-3">
        <h1 className="font-mono text-xl font-bold leading-6 text-foreground">
          {purchasePanelProps.title}
        </h1>
        <p className="shrink-0 rounded-full bg-surface-card px-2 py-1 font-mono text-xs text-text-accent">
          {purchasePanelProps.reviewsLabel}
        </p>
      </div>

      <p className="font-mono text-sm leading-6 text-text-secondary">
        {purchasePanelProps.aboutDescription}
      </p>

      <div className="flex flex-col gap-2">
        <p className="font-mono text-sm font-bold text-foreground">{purchasePanelProps.editionTitle}</p>
        <ul className="flex flex-wrap gap-2">{editionChips}</ul>
      </div>

      <div className="flex flex-col gap-1 font-mono text-sm leading-5 text-foreground">
        <p>{purchasePanelProps.tokenIdLabel}</p>
        <p>{purchasePanelProps.collectionLabel}</p>
        <p>{purchasePanelProps.attributesLabel}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-secondary">Qtd.</span>
          <button
            aria-label={purchasePanelProps.decreaseQuantityAriaLabel}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border text-foreground"
            type="button"
            onClick={purchasePanelProps.onDecreaseQuantityClick}
          >
            <Minus aria-hidden size={14} />
          </button>
          <span className="font-mono text-base text-foreground">{purchasePanelProps.quantityLabel}</span>
          <button
            aria-label={purchasePanelProps.increaseQuantityAriaLabel}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border text-foreground"
            type="button"
            onClick={purchasePanelProps.onIncreaseQuantityClick}
          >
            <Plus aria-hidden size={14} />
          </button>
        </div>
        <p className="font-mono text-lg font-bold text-text-accent">{purchasePanelProps.priceLabel}</p>
      </div>
      {mobileAvailabilityElement}

      <div className="flex items-center gap-3">
        <Button
          className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full bg-primary font-mono text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-60"
          disabled={purchasePanelProps.isBuyDisabled}
          type="button"
          onClick={purchasePanelProps.onBuyClick}
        >
          Comprar NFT
        </Button>
        <Button
          aria-label="Adicionar ao carrinho"
          className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-border text-text-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={purchasePanelProps.isBuyDisabled}
          type="button"
          onClick={purchasePanelProps.onBuyClick}
        >
          <ShoppingCart aria-hidden size={18} />
        </Button>
      </div>
    </section>
  )
}
