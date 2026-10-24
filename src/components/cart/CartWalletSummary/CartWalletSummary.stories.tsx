import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { CartWalletSummary } from '@/components/cart/CartWalletSummary/CartWalletSummary'
import { cartStoryWalletSummaryProps } from '@/consts/cartStoryContent'

const meta = {
  title: 'Cart/CartWalletSummary',
  component: CartWalletSummary,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...cartStoryWalletSummaryProps,
    onPromoApplyClick: fn(),
    onCheckoutClick: fn(),
    onContinueShoppingClick: fn(),
  },
} satisfies Meta<typeof CartWalletSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
