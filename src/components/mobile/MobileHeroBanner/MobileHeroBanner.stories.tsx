import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileHeroBanner } from '@/components/mobile/MobileHeroBanner/MobileHeroBanner'
import { mobileStoryHeroBannerProps } from '@/consts/mobileStoryContent'

const meta = {
  title: 'Mobile/MobileHeroBanner',
  component: MobileHeroBanner,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: mobileStoryHeroBannerProps,
} satisfies Meta<typeof MobileHeroBanner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
