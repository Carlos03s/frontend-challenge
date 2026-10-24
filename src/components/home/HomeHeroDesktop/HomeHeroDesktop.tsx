import { mergeClassNames } from '@/utils/mergeClassNames'
import type {
  HomeHeroDesktopProps,
  HomeHeroDesktopSlideIndicator,
} from '@/types/homeHeroDesktop'

type HomeHeroDesktopSlideDotProps = {
  indicator: HomeHeroDesktopSlideIndicator
}

function HomeHeroDesktopSlideDot({ indicator }: HomeHeroDesktopSlideDotProps) {
  const isActive = indicator.isActive
  const dotClassName = mergeClassNames(
    'size-2 rounded-full',
    isActive ? 'bg-primary' : 'bg-primary/35',
  )

  return <span aria-hidden className={dotClassName} />
}

export function HomeHeroDesktop({
  eyebrowLabel,
  titleLineOne,
  titleLineTwo,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  featuredImageSrc,
  featuredImageAlt,
  slideIndicators,
  slideIndicatorsAriaLabel,
}: HomeHeroDesktopProps) {
  const slideDots = slideIndicators.map((indicator) => (
    <HomeHeroDesktopSlideDot key={indicator.id} indicator={indicator} />
  ))

  const ctaClassName = mergeClassNames(
    'inline-flex h-10 w-[140px] items-center justify-center rounded-md',
    'bg-primary font-mono text-base font-bold uppercase leading-5 text-ink',
    'cursor-pointer transition-colors duration-150 hover:bg-copper-hover',
  )

  const hasCtaClickHandler = onCtaClick !== undefined
  const ctaElement = hasCtaClickHandler ? (
    <button className={ctaClassName} type="button" onClick={onCtaClick}>
      {ctaLabel}
    </button>
  ) : (
    <a className={ctaClassName} href={ctaHref ?? '#catalogo'}>
      {ctaLabel}
    </a>
  )

  const slideIndicatorGroup = (
    <div
      aria-label={slideIndicatorsAriaLabel}
      className="flex h-2 items-center gap-2"
      role="group"
    >
      {slideDots}
    </div>
  )

  return (
    <section aria-labelledby="home-hero-desktop-title" className="w-full bg-background">
      <div className="mx-auto flex w-full min-w-0 max-w-[1200px] flex-col items-center gap-8 px-0 py-4 lg:flex-row lg:items-center lg:justify-between lg:py-0 lg:pl-10">
        <div className="flex w-full min-w-0 max-w-[600px] flex-1 flex-col items-start gap-8 lg:items-end lg:gap-11">
          <div className="flex w-full flex-col items-start gap-8">
            <div className="flex w-full flex-col items-start gap-1">
              <div className="flex w-full flex-col items-start gap-2 text-foreground">
                <p className="font-mono text-sm font-medium leading-4 tracking-[1.4px]">
                  {eyebrowLabel}
                </p>

                <h1
                  className="font-mono text-3xl font-bold uppercase leading-tight text-foreground lg:text-[43px] lg:leading-[70px]"
                  id="home-hero-desktop-title"
                >
                  <span className="block">{titleLineOne}</span>
                  <span className="block">{titleLineTwo}</span>
                </h1>
              </div>

              <p className="max-w-[557px] font-mono text-sm font-normal leading-6 text-text-secondary">
                {description}
              </p>
            </div>

            {ctaElement}
          </div>

          {slideIndicatorGroup}
        </div>

        <div className="aspect-square w-full min-w-0 max-w-[450px] shrink overflow-hidden rounded-3xl lg:w-[min(450px,42%)]">
          <img
            alt={featuredImageAlt}
            className="size-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
            height={450}
            src={featuredImageSrc}
            width={450}
          />
        </div>
      </div>
    </section>
  )
}
