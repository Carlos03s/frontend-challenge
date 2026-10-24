import { Button } from '@/components/ui/button'
import { mergeClassNames } from '@/utils/mergeClassNames'
import type {
  NftDetailEditionOption,
  NftDetailPurchasePanelProps,
  NftDetailSocialLink,
} from '@/types/nftDetail'

type NftDetailEditionChipProps = {
  option: NftDetailEditionOption
  onEditionOptionClick?: (editionId: string) => void
}

function NftDetailEditionChip({ option, onEditionOptionClick }: NftDetailEditionChipProps) {
  const handleClick = () => {
    if (onEditionOptionClick !== undefined) {
      onEditionOptionClick(option.id)
    }
  }
  const chipClassName = mergeClassNames(
    'flex h-7 items-center justify-center rounded-full border px-2 font-mono text-sm leading-4',
    option.isActive
      ? 'border-primary font-medium text-text-accent'
      : 'border-border font-normal text-text-secondary',
  )

  return (
    <button className={chipClassName} type="button" onClick={handleClick}>
      {option.label}
    </button>
  )
}

type NftDetailStarRatingProps = {
  filledStarCount: number
  starIconSrc: string
  starIconMutedSrc: string
  reviewsLabel: string
}

function NftDetailStarRating({
  filledStarCount,
  starIconSrc,
  starIconMutedSrc,
  reviewsLabel,
}: NftDetailStarRatingProps) {
  const starIndexes = [0, 1, 2, 3, 4]
  const starElements = starIndexes.map((starIndex) => {
    const isFilled = starIndex < filledStarCount
    const iconSrc = isFilled ? starIconSrc : starIconMutedSrc
    const starKey = `star-${starIndex}`

    return (
      <li key={starKey}>
        <img alt="" className="size-[15px]" src={iconSrc} />
      </li>
    )
  })

  return (
    <div className="flex items-center gap-1">
      <ul className="flex items-center gap-1">{starElements}</ul>
      <p className="font-mono text-[15px] font-normal leading-none text-foreground">
        {reviewsLabel}
      </p>
    </div>
  )
}

type NftDetailSocialLinkItemProps = {
  socialLink: NftDetailSocialLink
}

function NftDetailSocialLinkItem({ socialLink }: NftDetailSocialLinkItemProps) {
  return (
    <li>
      <a aria-label={socialLink.ariaLabel} href={socialLink.href}>
        <img alt="" className={socialLink.iconClassName} src={socialLink.iconSrc} />
      </a>
    </li>
  )
}

export function NftDetailPurchasePanel({
  title,
  priceLabel,
  starIconSrc,
  starIconMutedSrc,
  filledStarCount,
  reviewsLabel,
  aboutTitle,
  aboutDescription,
  editionTitle,
  editionOptions,
  quantityLabel,
  decreaseQuantityAriaLabel,
  increaseQuantityAriaLabel,
  quantityDecreaseIconSrc,
  quantityIncreaseIconSrc,
  buyLabel,
  availabilityMessage,
  isBuyDisabled,
  favoriteLabel,
  favoriteIconSrc,
  tokenIdLabel,
  collectionLabel,
  attributesLabel,
  shareTitle,
  socialLinks,
  onBuyClick,
  onFavoriteClick,
  onDecreaseQuantityClick,
  onIncreaseQuantityClick,
  onEditionOptionClick,
}: NftDetailPurchasePanelProps) {
  const hasAvailabilityMessage =
    availabilityMessage !== undefined && availabilityMessage.length > 0
  const availabilityMessageElement = hasAvailabilityMessage ? (
    <p className="font-mono text-sm text-text-accent">{availabilityMessage}</p>
  ) : null

  const editionChips = editionOptions.map((option) => (
    <li key={option.id}>
      <NftDetailEditionChip onEditionOptionClick={onEditionOptionClick} option={option} />
    </li>
  ))

  const socialLinkElements = socialLinks.map((socialLink) => (
    <NftDetailSocialLinkItem key={socialLink.id} socialLink={socialLink} />
  ))

  return (
    <div className="flex min-h-[448px] flex-1 flex-col justify-between">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[28px] font-bold leading-none text-foreground">{title}</p>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[22px] font-bold leading-4 text-text-accent">{priceLabel}</p>
          <NftDetailStarRating
            filledStarCount={filledStarCount}
            reviewsLabel={reviewsLabel}
            starIconMutedSrc={starIconMutedSrc}
            starIconSrc={starIconSrc}
          />
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3">
        <p className="font-mono text-[15px] font-bold leading-4 text-foreground">{aboutTitle}</p>
        <p className="font-mono text-sm font-normal leading-6 text-text-secondary">
          {aboutDescription}
        </p>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3">
        <p className="font-mono text-[15px] font-bold leading-4 text-foreground">{editionTitle}</p>
        <ul className="flex flex-wrap items-center gap-1.5">{editionChips}</ul>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Button
            aria-label={decreaseQuantityAriaLabel}
            className="flex size-[33px] items-center justify-center rounded-full border border-ink bg-primary shadow-[0_6.6px_9.9px_rgba(20,13,10,0.15)]"
            type="button"
            onClick={onDecreaseQuantityClick}
          >
            <img alt="" className="size-[26.4px]" src={quantityDecreaseIconSrc} />
          </Button>
          <p className="font-mono text-xl font-normal leading-7 text-foreground">{quantityLabel}</p>
          <Button
            aria-label={increaseQuantityAriaLabel}
            className="flex size-[33px] items-center justify-center rounded-full border border-ink bg-primary shadow-[0_6.6px_9.9px_rgba(20,13,10,0.15)]"
            type="button"
            onClick={onIncreaseQuantityClick}
          >
            <img alt="" className="size-[26.4px]" src={quantityIncreaseIconSrc} />
          </Button>
        </div>

        <div className="flex flex-col items-end gap-2">
          {availabilityMessageElement}
          <div className="flex items-center gap-2">
            <Button
              className="flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md bg-primary px-4 font-mono text-sm font-bold leading-5 text-ink disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isBuyDisabled}
              type="button"
              onClick={onBuyClick}
            >
              {buyLabel}
            </Button>
            <Button
              className="flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-primary px-4 font-mono text-sm font-medium leading-5 text-text-accent"
              type="button"
              onClick={onFavoriteClick}
            >
              <img alt="" className="size-5" src={favoriteIconSrc} />
              {favoriteLabel}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3">
        <div className="flex flex-col gap-3 font-mono text-[15px] font-normal leading-none text-secondary">
          <p>{tokenIdLabel}</p>
          <p>{collectionLabel}</p>
          <p>{attributesLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-mono text-[15px] font-bold leading-4 text-foreground">{shareTitle}</p>
          <ul className="flex items-center gap-2">{socialLinkElements}</ul>
        </div>
      </div>
    </div>
  )
}
