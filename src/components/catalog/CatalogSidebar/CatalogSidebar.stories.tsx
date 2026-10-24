import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { CatalogSidebar } from '@/components/catalog/CatalogSidebar/CatalogSidebar'
import {
  catalogSidebarFeaturedImageSrc,
  catalogSidebarStoryCollectionItems,
  catalogSidebarStoryNetworkItems,
} from '@/consts/catalogSidebarStoryContent'

const meta = {
  title: 'Home/CatalogSidebar',
  component: CatalogSidebar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    collectionsTitle: 'Coleções',
    collectionItems: catalogSidebarStoryCollectionItems,
    priceRangeTitle: 'Faixa de preço',
    priceRangeLabel: 'Preço: 0,02 - 12,30 ETH',
    priceRangeStartPercent: 4,
    priceRangeEndPercent: 76,
    applyButtonLabel: 'Aplicar',
    networkTitle: 'Rede',
    networkItems: catalogSidebarStoryNetworkItems,
    featuredEyebrowLabel: 'NFT EM DESTAQUE',
    featuredTitleLabel: 'OFERTA LIMITADA',
    featuredImageSrc: catalogSidebarFeaturedImageSrc,
    featuredImageAlt: 'Colecionável em destaque com oferta limitada',
    featuredHref: '/mercado/destaque',
    onApplyPriceRangeClick: fn(),
  },
} satisfies Meta<typeof CatalogSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const DesktopSidebar: Story = {}
