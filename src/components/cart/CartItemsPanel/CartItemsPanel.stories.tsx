import type { Meta, StoryObj } from '@storybook/react-vite'

import { CartItemsPanel } from '@/components/cart/CartItemsPanel/CartItemsPanel'
import { cartStoryItemsPanelProps } from '@/consts/cartStoryContent'

const meta = {
  title: 'Cart/CartItemsPanel',
  component: CartItemsPanel,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: cartStoryItemsPanelProps,
} satisfies Meta<typeof CartItemsPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
