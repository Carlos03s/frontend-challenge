import type { Meta, StoryObj } from '@storybook/react-vite'

import { CartTableHeader } from '@/components/cart/CartTableHeader/CartTableHeader'

const meta = {
  title: 'Cart/CartTableHeader',
  component: CartTableHeader,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    nftsColumnLabel: 'NFTs',
    priceColumnLabel: 'Preço',
    editionsColumnLabel: 'Edições',
    totalColumnLabel: 'Total',
  },
} satisfies Meta<typeof CartTableHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
