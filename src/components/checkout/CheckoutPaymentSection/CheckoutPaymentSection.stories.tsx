import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { CheckoutPaymentSection } from '@/components/checkout/CheckoutPaymentSection/CheckoutPaymentSection'
import { checkoutStoryPaymentSectionProps } from '@/consts/checkoutStoryContent'

const meta = {
  title: 'Checkout/CheckoutPaymentSection',
  component: CheckoutPaymentSection,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...checkoutStoryPaymentSectionProps,
    orderReviewProps: {
      ...checkoutStoryPaymentSectionProps.orderReviewProps,
      onConfirmClick: fn(),
    },
  },
} satisfies Meta<typeof CheckoutPaymentSection>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
