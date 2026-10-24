import { HomePromoCard } from '@/components/home/HomePromoCard/HomePromoCard'
import type { HomePromosProps } from '@/types/homePromos'

export function HomePromos({ promoCards }: HomePromosProps) {
  const promoCardElements = promoCards.map((promoCard) => (
    <HomePromoCard key={promoCard.titleLineOne} {...promoCard} />
  ))

  return (
    <section className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 xl:grid-cols-2">
      {promoCardElements}
    </section>
  )
}
