import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckoutDesktopReference } from '@/components/reference/CheckoutDesktopReference/CheckoutDesktopReference'

const meta = {
  title: 'Reference/CheckoutDesktop',
  component: CheckoutDesktopReference,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof CheckoutDesktopReference>

export default meta

type Story = StoryObj<typeof meta>

export const FigmaReference: Story = {}
