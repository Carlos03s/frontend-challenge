import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { HomeCatalogToolbar } from '@/components/home/HomeCatalogToolbar/HomeCatalogToolbar'
import {
  homeCatalogSortIconSrc,
  homeCatalogStoryTabs,
} from '@/consts/homeCatalogStoryContent'

const meta = {
  title: 'Home/Catalog/HomeCatalogToolbar',
  component: HomeCatalogToolbar,
  parameters: {
    layout: 'centered',
  },
  args: {
    tabs: homeCatalogStoryTabs,
    sortPrefixLabel: 'Ordenar por:',
    sortLabel: 'Listados recentemente',
    sortAriaLabel: 'Ordenar por: Listados recentemente',
    sortIconSrc: homeCatalogSortIconSrc,
    onSortClick: fn(),
  },
} satisfies Meta<typeof HomeCatalogToolbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
