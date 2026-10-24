import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { OrderConfirmationModal } from '@/components/order/OrderConfirmationModal/OrderConfirmationModal'
import { orderStoryConfirmationModalProps } from '@/consts/orderStoryContent'

const meta = {
  title: 'Order/OrderConfirmationModal',
  component: OrderConfirmationModal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...orderStoryConfirmationModalProps,
    onCloseClick: fn(),
    onEtherscanClick: fn(),
  },
} satisfies Meta<typeof OrderConfirmationModal>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
