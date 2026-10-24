import type {
  HomeCatalogPage,
  HomeCatalogTab,
  HomeNftCardProps,
} from '@/types/homeCatalog'

const apeGreenImageSrc = '/assets/home/figma/ape-green.webp'
const apePurpleImageSrc = '/assets/home/figma/ape-purple.webp'
const apeBlackImageSrc = '/assets/home/figma/ape-black.webp'
const apeGoldenImageSrc = '/assets/home/figma/ape-golden.webp'

export const homeCatalogSortIconSrc = '/assets/home/figma/arrow-down.svg'
export const homeCatalogNextIconSrc = '/assets/home/figma/arrow-right-2.png'

export const homeCatalogStoryTabs: HomeCatalogTab[] = [
  { id: 'all', label: 'Todos os NFTs', to: '/', isActive: true },
  { id: 'new', label: 'Novos lançamentos', to: '/', isActive: false },
  { id: 'trending', label: 'Em alta', to: '/', isActive: false },
]

export const homeCatalogStoryPages: HomeCatalogPage[] = [
  { id: 'page-1', label: '1', pageNumber: 1, isActive: true },
  { id: 'page-2', label: '2', pageNumber: 2, isActive: false },
  { id: 'page-3', label: '3', pageNumber: 3, isActive: false },
  { id: 'page-4', label: '4', pageNumber: 4, isActive: false },
]

export const homeCatalogStoryNftCards: HomeNftCardProps[] = [
  {
    name: 'Emerald Ape #042',
    to: '/nfts/demo',
    imageSrc: apeGreenImageSrc,
    imageAlt: 'Emerald Ape #042',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 12,
    priceLabel: '1.19 ETH',
  },
  {
    name: 'Sage Nomad #009',
    to: '/nfts/demo',
    imageSrc: apePurpleImageSrc,
    imageAlt: 'Sage Nomad #009',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 12,
    priceLabel: '1.69 ETH',
  },
  {
    name: 'Neon Vessel #552',
    to: '/nfts/demo',
    imageSrc: apeBlackImageSrc,
    imageAlt: 'Neon Vessel #552',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 12,
    priceLabel: '1.99 ETH',
    previousPriceLabel: '2.29 ETH',
  },
  {
    name: 'Cosmic Bloom #118',
    to: '/nfts/demo',
    imageSrc: apePurpleImageSrc,
    imageAlt: 'Cosmic Bloom #118',
    imageWidth: 224,
    imageHeight: 286,
    imageBorderRadius: 13,
    priceGap: 6,
    priceLabel: '1.29 ETH',
  },
  {
    name: 'Violet Nomad #314',
    to: '/nfts/demo',
    imageSrc: apePurpleImageSrc,
    imageAlt: 'Violet Nomad #314',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 6,
    priceLabel: '1.39 ETH',
  },
  {
    name: 'Ivory Baron #088',
    to: '/nfts/demo',
    imageSrc: apeBlackImageSrc,
    imageAlt: 'Ivory Baron #088',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 6,
    priceLabel: '1.79 ETH',
  },
  {
    name: 'Golden Beat #207',
    to: '/nfts/demo',
    imageSrc: apeGoldenImageSrc,
    imageAlt: 'Golden Beat #207',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 6,
    priceLabel: '0.99 ETH',
  },
  {
    name: '',
    to: '/nfts/demo',
    imageSrc: apeGoldenImageSrc,
    imageAlt: 'NFT dourado',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 6,
  },
  {
    name: 'Golden Signal #160',
    to: '/nfts/demo',
    imageSrc: apeGoldenImageSrc,
    imageAlt: 'Golden Signal #160',
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 6,
    priceLabel: '0.39 ETH',
  },
]
