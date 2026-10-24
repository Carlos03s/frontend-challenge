import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomePage } from '@/pages/home/HomePage'

const meta = {
  title: 'Home/Reference/HomeDesktop',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const FigmaReference: Story = {}
