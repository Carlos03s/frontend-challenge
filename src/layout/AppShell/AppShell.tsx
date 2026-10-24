import { useQueryClient } from '@tanstack/react-query'
import { Outlet, ScrollRestoration, useNavigate, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

import { HomeFooter } from '@/components/home/HomeFooter/HomeFooter'
import { HomeHeader } from '@/components/home/HomeHeader/HomeHeader'
import { MobileTabBar } from '@/components/mobile/MobileTabBar/MobileTabBar'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useSessionQuery } from '@/hooks/useSessionQuery'
import {
  homeFooterStoryFeatures,
  homeFooterStoryLinkColumns,
  homeFooterStorySocialLinks,
} from '@/consts/homeFooterStoryContent'
import {
  homeHeaderCartIconSrc,
  homeHeaderLoginIconSrc,
  homeHeaderSearchIconSrc,
} from '@/consts/homeHeaderStoryNavItems'
import { buildAppNavItems, catalogSectionHash } from '@/utils/buildAppNavItems'
import { buildMobileTabBarProps, resolveMobileActiveTabId } from '@/utils/buildMobileTabBarProps'
import { clearPrivateSessionState } from '@/utils/clearPrivateSessionState'
import { countCartItems } from '@/utils/mapCartDtoToUiProps'
import { registerSessionExpiredHandler } from '@/utils/sessionExpiredHandler'

export function AppShell() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const routerState = useRouterState()
  const pathname = routerState.location.pathname
  const locationHash = routerState.location.hash
  const locationSearch = routerState.location.search as Record<string, unknown>
  const sessionQuery = useSessionQuery()
  const cartQuery = useCartQuery()
  const cartCount = countCartItems(cartQuery.data)
  const cartCountLabel = String(cartCount)
  const isAuthenticated = sessionQuery.data !== undefined

  const loginLabel = isAuthenticated ? 'Conta' : 'Entrar'
  const loginTo = isAuthenticated ? '/perfil' : '/login'
  const navItems = buildAppNavItems(pathname, locationHash, locationSearch)
  const mobileActiveTabId = resolveMobileActiveTabId(pathname)

  useEffect(() => {
    registerSessionExpiredHandler((redirectPath) => {
      clearPrivateSessionState(queryClient)

      if (redirectPath === null) {
        return
      }

      void navigate({ to: '/login', search: { redirect: redirectPath } })
    })
  }, [navigate, queryClient])

  const handleCartClick = () => {
    void navigate({ to: '/carrinho' })
  }

  const handleSearchClick = () => {
    const focusVisibleSearch = () => {
      const searchInputs = document.querySelectorAll<HTMLInputElement>('[data-catalog-search]')
      const visibleSearchInput = Array.from(searchInputs).find(
        (searchInput) => searchInput.getClientRects().length > 0,
      )

      visibleSearchInput?.focus()
    }

    void navigate({ to: '/', hash: catalogSectionHash }).then(focusVisibleSearch)
  }

  const handleMobileHomeClick = () => {
    void navigate({ to: '/' })
  }

  const handleMobileFavoritesClick = () => {
    if (!isAuthenticated) {
      void navigate({ to: '/login', search: { redirect: '/' } })
      return
    }

    void navigate({ to: '/perfil' })
  }

  const handleMobileProfileClick = () => {
    if (!isAuthenticated) {
      void navigate({ to: '/login', search: { redirect: '/perfil' } })
      return
    }

    void navigate({ to: '/perfil' })
  }

  const handleMobileCenterClick = () => {
    void navigate({ to: '/', hash: catalogSectionHash })
  }

  const isAuthRoute = pathname === '/login' || pathname === '/cadastro'
  const shouldShowMobileTabBar = !isAuthRoute

  const mobileTabBarProps = buildMobileTabBarProps(mobileActiveTabId, cartCountLabel, {
    onHomeClick: handleMobileHomeClick,
    onFavoritesClick: handleMobileFavoritesClick,
    onCartClick: handleCartClick,
    onProfileClick: handleMobileProfileClick,
    onCenterActionClick: handleMobileCenterClick,
  })

  const headerElement = (
    <HomeHeader
      brandLabel="KURIO"
      brandTo="/"
      cartAriaLabel={`Carrinho, ${cartCountLabel} itens`}
      cartCountLabel={cartCountLabel}
      cartIconSrc={homeHeaderCartIconSrc}
      loginAriaLabel={isAuthenticated ? 'Abrir perfil' : 'Entrar na conta'}
      loginIconSrc={homeHeaderLoginIconSrc}
      loginLabel={loginLabel}
      loginTo={loginTo}
      navItems={navItems}
      searchAriaLabel="Buscar no catálogo"
      searchIconSrc={homeHeaderSearchIconSrc}
      onCartClick={handleCartClick}
      onSearchClick={handleSearchClick}
    />
  )

  const footerElement = (
    <HomeFooter
      brandDescriptionLineOne="Feito para colecionadores,"
      brandDescriptionLineTwo="criadores e cultura"
      brandLabel="KURIO"
      contactEmailHref="mailto:contato@email.com"
      contactEmailLabel="contato@email.com"
      copyrightLabel="© 2026 Kurio. Propriedade digital para todos."
      features={homeFooterStoryFeatures}
      linkColumns={homeFooterStoryLinkColumns}
      newsletterDescription="Receba lançamentos selecionados, histórias de criadores e novidades do mercado."
      newsletterPlaceholder="digite seu e-mail..."
      newsletterSubmitLabel="Enviar"
      newsletterTitle="Antecipe-se ao próximo lançamento"
      phoneLabel="+55 11 4002 8922"
      socialLinks={homeFooterStorySocialLinks}
      socialSectionTitle="Redes sociais"
      walletSectionTitle="Carteiras compatíveis"
      walletsLabel="METAMASK  •  WALLETCONNECT  •  COINBASE"
    />
  )

  const mobileTabBarElement = shouldShowMobileTabBar ? (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 lg:hidden">
      <MobileTabBar {...mobileTabBarProps} />
    </div>
  ) : null

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-x-clip bg-background px-4 py-4 lg:max-w-[1440px] lg:px-[clamp(1.5rem,8vw,120px)] lg:py-6">
      <ScrollRestoration />
      <div className="mb-8 hidden lg:block">{headerElement}</div>
      <div className={shouldShowMobileTabBar ? 'pb-28 lg:pb-0' : 'lg:pb-0'}>
        <Outlet />
      </div>
      <div className="mt-16 hidden lg:mt-24 lg:block">{footerElement}</div>
      {mobileTabBarElement}
    </div>
  )
}
