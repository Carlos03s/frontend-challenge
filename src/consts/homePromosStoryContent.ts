import type { HomePromoCardProps } from '@/types/homePromos'

export const homePromosStoryCards: HomePromoCardProps[] = [
  {
    titleLineOne: 'Lançamentos gênesis',
    titleLineTwo: 'de edição limitada',
    description: 'Colecione edições escassas diretamente dos criadores antes da revelação pública.',
    ctaLabel: 'Explorar',
    ctaHref: '#',
    imageSrc: '/assets/home/figma/ape-green.webp',
    imageAlt: 'Lançamentos gênesis de edição limitada',
    imageLeft: -5,
    imageWidth: 292,
    imageBorderRadius: 18,
    decorationSrc: '/assets/home/figma/promo-decoration.svg',
  },
  {
    titleLineOne: 'Arte digital selecionada',
    titleLineTwo: 'e muito mais',
    description: 'Explore novos artistas, coleções verificadas e obras digitais que definem a cultura.',
    ctaLabel: 'Explorar',
    ctaHref: '#',
    imageSrc: '/assets/home/figma/ape-black.webp',
    imageAlt: 'Arte digital selecionada',
    imageLeft: 2,
    imageWidth: 287,
    imageBorderRadius: 17,
    decorationSrc: '/assets/home/figma/promo-decoration.svg',
  },
]
