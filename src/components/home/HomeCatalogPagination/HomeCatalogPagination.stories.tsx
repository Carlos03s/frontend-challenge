import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeCatalogPagination } from '@/components/home/HomeCatalogPagination/HomeCatalogPagination'
import {
  homeCatalogNextIconSrc,
  homeCatalogStoryPages,
} from '@/consts/homeCatalogStoryContent'

const meta = {
  title: 'Home/Catalog/HomeCatalogPagination',
  component: HomeCatalogPagination,
  parameters: {
    layout: 'centered',
  },
  args: {
    pages: homeCatalogStoryPages,
    nextAriaLabel: 'Próxima página',
    isNextDisabled: false,
    nextIconSrc: homeCatalogNextIconSrc,
  },
} satisfies Meta<typeof HomeCatalogPagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
