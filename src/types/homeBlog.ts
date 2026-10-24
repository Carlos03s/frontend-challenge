export type HomeBlogCardProps = {
  metadataLabel: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
}

export type HomeBlogProps = {
  title: string
  description: string
  blogCards: HomeBlogCardProps[]
}
