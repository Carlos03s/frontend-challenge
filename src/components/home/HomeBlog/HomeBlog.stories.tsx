import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeBlog } from '@/components/home/HomeBlog/HomeBlog'
import { homeBlogStoryCards } from '@/consts/homeBlogStoryContent'

const meta = {
  title: 'Home/Blog/HomeBlog',
  component: HomeBlog,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Diário da Cunhagem',
    description:
      'Histórias, guias e insights para colecionadores sobre o universo da propriedade digital.',
    blogCards: homeBlogStoryCards,
  },
} satisfies Meta<typeof HomeBlog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
