import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import {
  homeHeaderCartIconSrc,
  homeHeaderLoginIconSrc,
  homeHeaderSearchIconSrc,
  homeHeaderStoryNavItemsInicioActive,
  homeHeaderStoryNavItemsMercadoActive,
} from '@/consts/homeHeaderStoryNavItems'
import { HomeHeader } from '@/components/home/HomeHeader/HomeHeader'

const meta = {
  title: 'Home/HomeHeader',
  component: HomeHeader,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    brandLabel: 'KURIO',
    brandTo: '/',
    navItems: homeHeaderStoryNavItemsInicioActive,
    cartCountLabel: '6',
    searchAriaLabel: 'Buscar',
    cartAriaLabel: 'Carrinho, 6 itens',
    searchIconSrc: homeHeaderSearchIconSrc,
    cartIconSrc: homeHeaderCartIconSrc,
    loginLabel: 'Entrar',
    loginTo: '/login',
    loginAriaLabel: 'Entrar na conta',
    loginIconSrc: homeHeaderLoginIconSrc,
    onSearchClick: fn(),
    onCartClick: fn(),
  },
} satisfies Meta<typeof HomeHeader>

export default meta

type Story = StoryObj<typeof meta>

export const InicioActive: Story = {}

export const MercadoActive: Story = {
  args: {
    navItems: homeHeaderStoryNavItemsMercadoActive,
  },
}

export const WithCartItems: Story = {
  args: {
    cartCountLabel: '3',
    cartAriaLabel: 'Carrinho, 3 itens',
  },
}
