export type HomeHeroDesktopSlideIndicator = {
  id: string
  isActive: boolean
}

export type HomeHeroDesktopProps = {
  eyebrowLabel: string
  titleLineOne: string
  titleLineTwo: string
  description: string
  ctaLabel: string
  ctaHref?: string
  onCtaClick?: () => void
  featuredImageSrc: string
  featuredImageAlt: string
  slideIndicators: HomeHeroDesktopSlideIndicator[]
  slideIndicatorsAriaLabel: string
}
