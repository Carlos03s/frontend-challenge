export type HomePromoCardProps = {
  titleLineOne: string
  titleLineTwo: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
  imageLeft: number
  imageWidth: number
  imageBorderRadius: number
  decorationSrc: string
}

export type HomePromosProps = {
  promoCards: HomePromoCardProps[]
}
