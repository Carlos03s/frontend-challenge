import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'

import { AppShell } from '@/layout/AppShell/AppShell'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { ProfilePage } from '@/pages/account/ProfilePage'
import { WalletsPage } from '@/pages/account/WalletsPage'
import { CartPage } from '@/pages/cart/CartPage'
import { CheckoutPage } from '@/pages/checkout/CheckoutPage'
import { HomePage } from '@/pages/home/HomePage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { NftDetailPage } from '@/pages/nft-detail/NftDetailPage'
import type { CatalogUrlSearch } from '@/utils/buildCatalogSearchParams'
import { hasSessionToken } from '@/utils/sessionToken'

const rootRoute = createRootRoute({
  component: Outlet,
})

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app-layout',
  component: AppShell,
})

function parseCatalogSearch(search: Record<string, unknown>): CatalogUrlSearch {
  const pageValue = search.page
  const parsedPage = typeof pageValue === 'number' ? pageValue : Number(pageValue)

  return {
    q: typeof search.q === 'string' ? search.q : undefined,
    collectionIds: typeof search.collectionIds === 'string' ? search.collectionIds : undefined,
    networkIds: typeof search.networkIds === 'string' ? search.networkIds : undefined,
    minPriceEth: typeof search.minPriceEth === 'string' ? search.minPriceEth : undefined,
    maxPriceEth: typeof search.maxPriceEth === 'string' ? search.maxPriceEth : undefined,
    sort:
      search.sort === 'price-asc' || search.sort === 'price-desc' || search.sort === 'recent'
        ? search.sort
        : 'recent',
    listing:
      search.listing === 'new' || search.listing === 'trending' ? search.listing : undefined,
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
  }
}

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/',
  validateSearch: parseCatalogSearch,
  component: HomePage,
})

const nftDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/nfts/$nftId',
  component: NftDetailPage,
})

const cartRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/carrinho',
  component: CartPage,
})

const checkoutRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/pagamento',
  beforeLoad: () => {
    const isAuthenticated = hasSessionToken()

    if (!isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: '/pagamento' } })
    }
  },
  component: CheckoutPage,
})

const loginRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/login',
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : '/',
  }),
  component: LoginPage,
})

const signUpRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/cadastro',
  component: SignUpPage,
})

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/perfil',
  beforeLoad: () => {
    const isAuthenticated = hasSessionToken()

    if (!isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: '/perfil' } })
    }
  },
  component: ProfilePage,
})

const notFoundRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '$',
  component: NotFoundPage,
})

const walletsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/carteiras',
  beforeLoad: () => {
    const isAuthenticated = hasSessionToken()

    if (!isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: '/carteiras' } })
    }
  },
  component: WalletsPage,
})

const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    indexRoute,
    nftDetailRoute,
    cartRoute,
    checkoutRoute,
    loginRoute,
    signUpRoute,
    profileRoute,
    walletsRoute,
    notFoundRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
