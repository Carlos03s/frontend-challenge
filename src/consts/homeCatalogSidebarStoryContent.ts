import type { HomeCatalogSidebarFilterRow } from '@/types/homeCatalogSidebar'

export const homeCatalogSidebarFeaturedImageSrc = '/assets/home/sidebar-featured-nft.jpg'

export const homeCatalogSidebarStoryCollectionRows: HomeCatalogSidebarFilterRow[] = [
  { id: 'digital-art', label: 'Arte digital', countLabel: '(33)', to: '/', isActive: true },
  { id: 'photography', label: 'Fotografia', countLabel: '(12)', to: '/', isActive: false },
  { id: 'music', label: 'Música', countLabel: '(65)', to: '/', isActive: false },
  { id: 'art-3d', label: 'Arte 3D', countLabel: '(39)', to: '/', isActive: false },
  { id: 'collectibles', label: 'Colecionáveis', countLabel: '(23)', to: '/', isActive: false },
  { id: 'generative', label: 'Generativa', countLabel: '(17)', to: '/', isActive: false },
  { id: 'games', label: 'Jogos', countLabel: '(19)', to: '/', isActive: false },
  { id: 'memberships', label: 'Assinaturas', countLabel: '(13)', to: '/', isActive: false },
  { id: 'utility', label: 'Utilidade', countLabel: '(18)', to: '/', isActive: false },
]

export const homeCatalogSidebarStoryNetworkRows: HomeCatalogSidebarFilterRow[] = [
  { id: 'ethereum', label: 'Ethereum', countLabel: '(119)', to: '/', isActive: false },
  { id: 'polygon', label: 'Polygon', countLabel: '(78)', to: '/', isActive: false },
  { id: 'solana', label: 'Solana', countLabel: '(86)', to: '/', isActive: false },
]
