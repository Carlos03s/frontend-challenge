import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileSearchBar } from '@/components/mobile/MobileSearchBar/MobileSearchBar'
import { mobileStorySearchBarProps } from '@/consts/mobileStoryContent'

const meta = {
  title: 'Mobile/MobileSearchBar',
  component: MobileSearchBar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: mobileStorySearchBarProps,
} satisfies Meta<typeof MobileSearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
