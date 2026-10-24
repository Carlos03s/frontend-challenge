import { HomeNftCard } from '@/components/home/HomeNftCard/HomeNftCard'
import { SectionHeading } from '@/components/shared/SectionHeading/SectionHeading'
import type { HomeNftCardProps } from '@/types/homeCatalog'

export type NftDetailRelatedSectionProps = {
  title: string
  nftCards: HomeNftCardProps[]
}

export function NftDetailRelatedSection({ title, nftCards }: NftDetailRelatedSectionProps) {
  const cardElements = nftCards.map((nftCard) => (
    <li key={nftCard.name}>
      <HomeNftCard {...nftCard} />
    </li>
  ))

  return (
    <section className="flex w-full flex-col gap-8">
      <SectionHeading title={title} />
      <ul className="flex gap-7">{cardElements}</ul>
    </section>
  )
}
