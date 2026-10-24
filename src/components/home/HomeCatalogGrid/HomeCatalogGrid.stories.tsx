import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeCatalogGrid } from '@/components/home/HomeCatalogGrid/HomeCatalogGrid'
import { homeCatalogStoryNftCards } from '@/consts/homeCatalogStoryContent'

const meta = {
  title: 'Home/Catalog/HomeCatalogGrid',
  component: HomeCatalogGrid,
  parameters: {
    layout: 'centered',
  },
  args: {
    nftCards: homeCatalogStoryNftCards,
  },
} satisfies Meta<typeof HomeCatalogGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
