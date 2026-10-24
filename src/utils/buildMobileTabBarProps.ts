import type { MobileTabBarProps } from '@/types/mobile'

type MobileTabBarHandlers = {
  onHomeClick: () => void
  onFavoritesClick: () => void
  onCartClick: () => void
  onProfileClick: () => void
  onCenterActionClick: () => void
}

export function resolveMobileActiveTabId(pathname: string): string {
  const isCartPath = pathname === '/carrinho' || pathname === '/pagamento'
  const isProfilePath =
    pathname === '/perfil' ||
    pathname === '/carteiras' ||
    pathname === '/login' ||
    pathname === '/cadastro'

  if (isCartPath) {
    return 'cart'
  }

  if (isProfilePath) {
    return 'profile'
  }

  return 'home'
}

export function buildMobileTabBarProps(
  activeTabId: string,
  cartCountLabel: string,
  handlers: MobileTabBarHandlers,
): MobileTabBarProps {
  return {
    activeTabId,
    cartCountLabel,
    tabs: [
      {
        id: 'home',
        ariaLabel: 'Início',
        iconSrc: '/assets/home/figma/search.svg',
        onClick: handlers.onHomeClick,
      },
      {
        id: 'favorites',
        ariaLabel: 'Favoritos',
        iconSrc: '/assets/nft-detail/figma/heart.svg',
        onClick: handlers.onFavoritesClick,
      },
      {
        id: 'cart',
        ariaLabel: 'Carrinho',
        iconSrc: '/assets/home/figma/cart.svg',
        onClick: handlers.onCartClick,
      },
      {
        id: 'profile',
        ariaLabel: 'Perfil',
        iconSrc: '/assets/home/figma/login.svg',
        onClick: handlers.onProfileClick,
      },
    ],
    centerActionIconSrc: '/assets/home/figma/promo-decoration.svg',
    centerActionAriaLabel: 'Ir ao catálogo',
    onCenterActionClick: handlers.onCenterActionClick,
  }
}
