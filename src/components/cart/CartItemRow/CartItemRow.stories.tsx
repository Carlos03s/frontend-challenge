import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { CartItemRow } from '@/components/cart/CartItemRow/CartItemRow'
import { cartStoryItemRowProps } from '@/consts/cartStoryContent'

const meta = {
  title: 'Cart/CartItemRow',
  component: CartItemRow,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...cartStoryItemRowProps,
    onDecreaseQuantityClick: fn(),
    onIncreaseQuantityClick: fn(),
    onRemoveClick: fn(),
  },
} satisfies Meta<typeof CartItemRow>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
