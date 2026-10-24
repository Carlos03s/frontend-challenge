import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeBlogCard } from '@/components/home/HomeBlogCard/HomeBlogCard'
import { homeBlogStoryCards } from '@/consts/homeBlogStoryContent'

const meta = {
  title: 'Home/Blog/HomeBlogCard',
  component: HomeBlogCard,
  parameters: {
    layout: 'centered',
  },
  args: homeBlogStoryCards[0],
} satisfies Meta<typeof HomeBlogCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
