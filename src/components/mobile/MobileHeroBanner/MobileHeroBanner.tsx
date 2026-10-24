import type { MobileHeroBannerProps } from '@/types/mobile'

export function MobileHeroBanner({
  eyebrowLabel,
  titleLineOne,
  titleLineTwo,
  description,
  ctaLabel,
  ctaArrowIconSrc,
  featuredImageSrc,
  featuredImageAlt,
  accentImageSrc,
  accentImageAlt,
  onCtaClick,
}: MobileHeroBannerProps) {
  const ctaElement = (
    <>
      <span className="font-mono text-sm leading-[14px] text-foreground">{ctaLabel}</span>
      <img alt="" className="size-4" src={ctaArrowIconSrc} />
    </>
  )

  return (
    <section className="relative h-[210px] w-full overflow-hidden rounded-2xl bg-surface-card p-4">
      <div className="flex h-full justify-between gap-2">
        <div className="flex min-w-0 max-w-[188px] flex-col gap-2">
          <p className="font-mono text-base leading-4 text-foreground">{eyebrowLabel}</p>
          <h1 className="font-mono text-[22px] font-bold uppercase leading-[29px] text-foreground">
            <span className="block">{titleLineOne}</span>
            <span className="block">{titleLineTwo}</span>
          </h1>
          <p className="font-mono text-sm leading-[18px] text-text-secondary">{description}</p>
          <button
            className="flex w-fit cursor-pointer items-center gap-2 transition-opacity duration-150 hover:opacity-80"
            type="button"
            onClick={onCtaClick}
          >
            {ctaElement}
          </button>
        </div>
        <div className="relative h-[146px] w-[138px] shrink-0">
          <img
            alt={featuredImageAlt}
            className="size-[138px] rounded-md object-cover"
            decoding="async"
            fetchPriority="high"
            height={138}
            src={featuredImageSrc}
            width={138}
          />
          <img
            alt={accentImageAlt}
            className="absolute bottom-0 right-0 size-[58px] rounded-md object-cover"
            src={accentImageSrc}
          />
        </div>
      </div>
    </section>
  )
}
