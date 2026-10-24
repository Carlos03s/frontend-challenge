import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckoutCollectorForm } from '@/components/checkout/CheckoutCollectorForm/CheckoutCollectorForm'
import { checkoutStoryCollectorFormProps } from '@/consts/checkoutStoryContent'

const meta = {
  title: 'Checkout/CheckoutCollectorForm',
  component: CheckoutCollectorForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: checkoutStoryCollectorFormProps,
} satisfies Meta<typeof CheckoutCollectorForm>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
