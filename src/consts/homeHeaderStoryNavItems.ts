import type { HomeHeaderNavItem } from '@/types/homeHeader'

export const homeHeaderSearchIconSrc = '/assets/home/figma/search.svg'
export const homeHeaderCartIconSrc = '/assets/home/figma/cart.svg'
export const homeHeaderLoginIconSrc = '/assets/home/figma/login.svg'

export const homeHeaderStoryNavItemsInicioActive: HomeHeaderNavItem[] = [
  { id: 'inicio', label: 'Início', to: '/', isActive: true },
  { id: 'mercado', label: 'Mercado', to: '/', isActive: false },
  { id: 'criadores', label: 'Criadores', to: '/', isActive: false, isDisabled: true },
  { id: 'aprenda', label: 'Aprenda', to: '/', isActive: false, isDisabled: true },
]

export const homeHeaderStoryNavItemsMercadoActive: HomeHeaderNavItem[] = [
  { id: 'inicio', label: 'Início', to: '/', isActive: false },
  { id: 'mercado', label: 'Mercado', to: '/', hash: 'catalogo', isActive: true },
  { id: 'criadores', label: 'Criadores', to: '/', isActive: false, isDisabled: true },
  { id: 'aprenda', label: 'Aprenda', to: '/', isActive: false, isDisabled: true },
]
