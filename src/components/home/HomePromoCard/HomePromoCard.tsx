import type { HomePromoCardProps } from '@/types/homePromos'

export function HomePromoCard({
  titleLineOne,
  titleLineTwo,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imageBorderRadius,
  decorationSrc,
}: HomePromoCardProps) {
  const imageStyle = {
    borderRadius: imageBorderRadius,
  }

  return (
    <article className="relative flex min-h-[220px] w-full min-w-0 overflow-hidden rounded-lg bg-surface-card sm:min-h-[250px]">
      <img
        alt={imageAlt}
        className="h-auto w-[42%] shrink-0 object-cover object-top sm:w-[46%]"
        decoding="async"
        loading="lazy"
        src={imageSrc}
        style={imageStyle}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-end justify-center gap-3 px-4 py-5 text-right sm:gap-4 sm:px-6">
        <h2 className="font-mono text-base font-bold leading-6 text-foreground sm:text-lg">
          <span className="block">{titleLineOne}</span>
          <span className="block">{titleLineTwo}</span>
        </h2>
        <p className="font-mono text-xs font-normal leading-5 text-text-secondary sm:text-sm sm:leading-6">
          {description}
        </p>
        <a
          className="inline-flex h-10 w-[140px] cursor-pointer items-center justify-center rounded-md bg-primary font-mono text-sm font-medium leading-5 text-ink transition-colors duration-150 hover:bg-copper-hover"
          href={ctaHref}
        >
          {ctaLabel} →
        </a>
      </div>

      <img
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 h-full w-[46%] object-cover object-left"
        src={decorationSrc}
      />
    </article>
  )
}
