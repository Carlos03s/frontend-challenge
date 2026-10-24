import type { CatalogSidebarFilterItem } from '@/types/catalogSidebar'

export const catalogSidebarFeaturedImageSrc = '/assets/home/sidebar-featured-nft.png'

export const catalogSidebarStoryCollectionItems: CatalogSidebarFilterItem[] = [
  {
    id: 'arte-digital',
    label: 'Arte digital',
    countLabel: '(33)',
    isSelected: true,
    href: '/mercado?categoria=arte-digital',
  },
  {
    id: 'fotografia',
    label: 'Fotografia',
    countLabel: '(12)',
    isSelected: false,
    href: '/mercado?categoria=fotografia',
  },
  {
    id: 'musica',
    label: 'Música',
    countLabel: '(65)',
    isSelected: false,
    href: '/mercado?categoria=musica',
  },
  {
    id: 'arte-3d',
    label: 'Arte 3D',
    countLabel: '(39)',
    isSelected: false,
    href: '/mercado?categoria=arte-3d',
  },
  {
    id: 'colecionaveis',
    label: 'Colecionáveis',
    countLabel: '(23)',
    isSelected: false,
    href: '/mercado?categoria=colecionaveis',
  },
  {
    id: 'generativa',
    label: 'Generativa',
    countLabel: '(17)',
    isSelected: false,
    href: '/mercado?categoria=generativa',
  },
  {
    id: 'jogos',
    label: 'Jogos',
    countLabel: '(19)',
    isSelected: false,
    href: '/mercado?categoria=jogos',
  },
  {
    id: 'assinaturas',
    label: 'Assinaturas',
    countLabel: '(13)',
    isSelected: false,
    href: '/mercado?categoria=assinaturas',
  },
  {
    id: 'utilidade',
    label: 'Utilidade',
    countLabel: '(18)',
    isSelected: false,
    href: '/mercado?categoria=utilidade',
  },
]

export const catalogSidebarStoryNetworkItems: CatalogSidebarFilterItem[] = [
  {
    id: 'ethereum',
    label: 'Ethereum',
    countLabel: '(119)',
    isSelected: false,
    href: '/mercado?rede=ethereum',
  },
  {
    id: 'polygon',
    label: 'Polygon',
    countLabel: '(78)',
    isSelected: false,
    href: '/mercado?rede=polygon',
  },
  {
    id: 'solana',
    label: 'Solana',
    countLabel: '(86)',
    isSelected: false,
    href: '/mercado?rede=solana',
  },
]
