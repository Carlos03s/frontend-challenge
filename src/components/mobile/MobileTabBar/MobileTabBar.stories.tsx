import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileTabBar } from '@/components/mobile/MobileTabBar/MobileTabBar'
import { mobileStoryTabBarProps } from '@/consts/mobileStoryContent'

const meta = {
  title: 'Mobile/MobileTabBar',
  component: MobileTabBar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: mobileStoryTabBarProps,
} satisfies Meta<typeof MobileTabBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
