import { Heart } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export type MobileNftCardProps = {
  name: string
  to: string
  imageSrc: string
  imageAlt: string
  priceLabel?: string
}

export function MobileNftCard({ name, to, imageSrc, imageAlt, priceLabel }: MobileNftCardProps) {
  const hasPrice = priceLabel !== undefined

  const priceElement = hasPrice ? (
    <p className="font-mono text-sm font-bold leading-4 text-text-accent">{priceLabel}</p>
  ) : null

  return (
    <Link className="flex min-w-0 flex-col gap-2" to={to}>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-card">
        <img
          alt={imageAlt}
          className="size-full object-cover"
          decoding="async"
          loading="lazy"
          src={imageSrc}
        />
        <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/50 text-foreground">
          <Heart aria-hidden size={14} strokeWidth={1.75} />
        </span>
      </div>
      <p className="truncate font-mono text-sm leading-4 text-foreground">{name}</p>
      {priceElement}
    </Link>
  )
}
