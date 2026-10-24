import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeNftCard } from '@/components/home/HomeNftCard/HomeNftCard'
import { homeCatalogStoryNftCards } from '@/consts/homeCatalogStoryContent'

const meta = {
  title: 'Home/Catalog/HomeNftCard',
  component: HomeNftCard,
  parameters: {
    layout: 'centered',
  },
  args: homeCatalogStoryNftCards[0],
} satisfies Meta<typeof HomeNftCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPreviousPrice: Story = {
  args: homeCatalogStoryNftCards[2],
}
