import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomePromos } from '@/components/home/HomePromos/HomePromos'
import { homePromosStoryCards } from '@/consts/homePromosStoryContent'

const meta = {
  title: 'Home/Promos/HomePromos',
  component: HomePromos,
  parameters: {
    layout: 'centered',
  },
  args: {
    promoCards: homePromosStoryCards,
  },
} satisfies Meta<typeof HomePromos>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
