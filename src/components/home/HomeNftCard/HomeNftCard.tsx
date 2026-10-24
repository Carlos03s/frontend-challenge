import { Link } from '@tanstack/react-router'

import type { HomeNftCardProps } from '@/types/homeCatalog'

export function HomeNftCard({
  name,
  to,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageBorderRadius,
  priceGap,
  priceLabel,
  previousPriceLabel,
}: HomeNftCardProps) {
  const hasName = name.length > 0
  const hasPrice = priceLabel !== undefined
  const hasPreviousPrice = previousPriceLabel !== undefined
  const imageStyle = {
    borderRadius: imageBorderRadius,
  }
  const detailsStyle = {
    gap: priceGap,
  }

  const nameElement = hasName ? (
    <p className="font-mono text-sm leading-4 text-foreground lg:text-base">{name}</p>
  ) : null

  const priceElement = hasPrice ? (
    <p className="font-mono text-base font-bold leading-4 text-text-accent lg:text-lg">{priceLabel}</p>
  ) : null

  const previousPriceElement = hasPreviousPrice ? (
    <p className="font-mono text-base font-normal leading-4 text-secondary lg:text-lg">
      {previousPriceLabel}
    </p>
  ) : null

  const pricesElement = hasPrice ? (
    <div className="flex flex-wrap items-center gap-2 lg:gap-3">
      {priceElement}
      {previousPriceElement}
    </div>
  ) : null

  const detailsElement = hasName ? (
    <div className="flex flex-col" style={detailsStyle}>
      {nameElement}
      {pricesElement}
    </div>
  ) : null

  return (
    <Link
      className="mx-auto flex w-full max-w-[258px] cursor-pointer flex-col gap-3 transition-opacity duration-150 hover:opacity-90"
      to={to}
    >
      <div className="flex aspect-[258/300] w-full items-center justify-center bg-surface-card">
        <img
          alt={imageAlt}
          className="size-full object-cover"
          decoding="async"
          height={imageHeight}
          loading="lazy"
          src={imageSrc}
          style={imageStyle}
          width={imageWidth}
        />
      </div>
      {detailsElement}
    </Link>
  )
}
