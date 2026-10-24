import type { Meta, StoryObj } from '@storybook/react-vite'

import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'

const meta = {
  title: 'Layout/PageBreadcrumb',
  component: PageBreadcrumb,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    label: 'Início / Mercado',
  },
} satisfies Meta<typeof PageBreadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CartPath: Story = {
  args: {
    label: 'Início / Mercado / Carrinho',
  },
}
