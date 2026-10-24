import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeCatalogSection } from '@/components/home/HomeCatalogSection/HomeCatalogSection'
import { HomeCatalogSidebar } from '@/components/home/HomeCatalogSidebar/HomeCatalogSidebar'
import {
  homeCatalogNextIconSrc,
  homeCatalogSortIconSrc,
  homeCatalogStoryNftCards,
  homeCatalogStoryPages,
  homeCatalogStoryTabs,
} from '@/consts/homeCatalogStoryContent'
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

const sidebarElement = (
  <HomeCatalogSidebar
    applyPriceRangeAriaLabel="Aplicar faixa de preço"
    applyPriceRangeLabel="Aplicar"
    collectionRows={homeCatalogSidebarStoryCollectionRows}
    collectionsSectionTitle="Coleções"
    featuredEyebrowLabel="NFT EM DESTAQUE"
    featuredImageAlt="NFT em destaque com oferta limitada"
    featuredImageSrc={homeCatalogSidebarFeaturedImageSrc}
    featuredTitleLabel="OFERTA LIMITADA"
    networkRows={homeCatalogSidebarStoryNetworkRows}
    networkSectionTitle="Rede"
    priceRangeBoundMax={catalogPriceRangeBoundMaxEth}
    priceRangeBoundMin={catalogPriceRangeBoundMinEth}
    priceRangeMaxValue={catalogPriceRangeBoundMaxEth}
    priceRangeMinValue={catalogPriceRangeBoundMinEth}
    priceRangeSectionTitle="Faixa de preço"
    priceRangeStep={catalogPriceRangeStepEth}
    priceRangeSummaryLabel="Preço: 0,02 - 12,30 ETH"
    onPriceRangeMaxChange={() => undefined}
    onPriceRangeMinChange={() => undefined}
  />
)

const meta = {
  title: 'Home/Catalog/HomeCatalogSection',
  component: HomeCatalogSection,
  parameters: {
    layout: 'centered',
  },
  args: {
    sidebarElement,
    toolbarProps: {
      tabs: homeCatalogStoryTabs,
      sortPrefixLabel: 'Ordenar por:',
      sortLabel: 'Listados recentemente',
      sortAriaLabel: 'Ordenar por: Listados recentemente',
      sortIconSrc: homeCatalogSortIconSrc,
    },
    gridProps: {
      nftCards: homeCatalogStoryNftCards,
    },
    paginationProps: {
      pages: homeCatalogStoryPages,
      nextAriaLabel: 'Próxima página',
      isNextDisabled: false,
      nextIconSrc: homeCatalogNextIconSrc,
    },
  },
} satisfies Meta<typeof HomeCatalogSection>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
