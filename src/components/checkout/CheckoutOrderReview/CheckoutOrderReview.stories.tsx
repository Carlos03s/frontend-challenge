import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { CheckoutOrderReview } from '@/components/checkout/CheckoutOrderReview/CheckoutOrderReview'
import { checkoutStoryOrderReviewProps } from '@/consts/checkoutStoryContent'

const meta = {
  title: 'Checkout/CheckoutOrderReview',
  component: CheckoutOrderReview,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...checkoutStoryOrderReviewProps,
    onConfirmClick: fn(),
  },
} satisfies Meta<typeof CheckoutOrderReview>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
