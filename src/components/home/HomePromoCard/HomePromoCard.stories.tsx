import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomePromoCard } from '@/components/home/HomePromoCard/HomePromoCard'
import { homePromosStoryCards } from '@/consts/homePromosStoryContent'

const meta = {
  title: 'Home/Promos/HomePromoCard',
  component: HomePromoCard,
  parameters: {
    layout: 'centered',
  },
  args: homePromosStoryCards[0],
} satisfies Meta<typeof HomePromoCard>

export default meta

type Story = StoryObj<typeof meta>

export const GenesisDrops: Story = {}

export const CuratedArt: Story = {
  args: homePromosStoryCards[1],
}
