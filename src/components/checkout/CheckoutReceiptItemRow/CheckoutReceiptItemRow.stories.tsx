import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckoutReceiptItemRow } from '@/components/checkout/CheckoutReceiptItemRow/CheckoutReceiptItemRow'
import { checkoutStoryReceiptItems } from '@/consts/checkoutStoryContent'

const meta = {
  title: 'Checkout/CheckoutReceiptItemRow',
  component: CheckoutReceiptItemRow,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    item: checkoutStoryReceiptItems[0],
  },
} satisfies Meta<typeof CheckoutReceiptItemRow>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
