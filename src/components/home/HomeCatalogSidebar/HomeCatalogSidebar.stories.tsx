import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import {
  catalogPriceRangeBoundMaxEth,
  catalogPriceRangeBoundMinEth,
  catalogPriceRangeStepEth,
} from '@/consts/catalogPriceRange'

import {
  homeCatalogSidebarFeaturedImageSrc,
  homeCatalogSidebarStoryCollectionRows,
  homeCatalogSidebarStoryNetworkRows,
} from '@/consts/homeCatalogSidebarStoryContent'
import { HomeCatalogSidebar } from '@/components/home/HomeCatalogSidebar/HomeCatalogSidebar'

const meta = {
  title: 'Home/HomeCatalogSidebar',
  component: HomeCatalogSidebar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    collectionsSectionTitle: 'Coleções',
    collectionRows: homeCatalogSidebarStoryCollectionRows,
    priceRangeSectionTitle: 'Faixa de preço',
    priceRangeSummaryLabel: 'Preço: 0,02 - 12,30 ETH',
    priceRangeMinValue: catalogPriceRangeBoundMinEth,
    priceRangeMaxValue: catalogPriceRangeBoundMaxEth,
    priceRangeBoundMin: catalogPriceRangeBoundMinEth,
    priceRangeBoundMax: catalogPriceRangeBoundMaxEth,
    priceRangeStep: catalogPriceRangeStepEth,
    onPriceRangeMinChange: fn(),
    onPriceRangeMaxChange: fn(),
    applyPriceRangeLabel: 'Aplicar',
    applyPriceRangeAriaLabel: 'Aplicar faixa de preço',
    networkSectionTitle: 'Rede',
    networkRows: homeCatalogSidebarStoryNetworkRows,
    featuredEyebrowLabel: 'NFT EM DESTAQUE',
    featuredTitleLabel: 'OFERTA LIMITADA',
    featuredImageSrc: homeCatalogSidebarFeaturedImageSrc,
    featuredImageAlt: 'NFT em destaque com oferta limitada',
    onApplyPriceRangeClick: fn(),
  },
} satisfies Meta<typeof HomeCatalogSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const DesktopSidebarExport: Story = {}
