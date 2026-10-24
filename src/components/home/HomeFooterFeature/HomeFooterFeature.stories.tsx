import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeFooterFeature } from '@/components/home/HomeFooterFeature/HomeFooterFeature'
import { homeFooterStoryFeatures } from '@/consts/homeFooterStoryContent'

const meta = {
  title: 'Home/Footer/HomeFooterFeature',
  component: HomeFooterFeature,
  parameters: {
    layout: 'centered',
  },
  args: homeFooterStoryFeatures[0],
} satisfies Meta<typeof HomeFooterFeature>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
