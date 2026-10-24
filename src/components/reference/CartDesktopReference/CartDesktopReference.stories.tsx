import type { Meta, StoryObj } from '@storybook/react-vite'

import { CartDesktopReference } from '@/components/reference/CartDesktopReference/CartDesktopReference'

const meta = {
  title: 'Reference/CartDesktop',
  component: CartDesktopReference,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof CartDesktopReference>

export default meta

type Story = StoryObj<typeof meta>

export const FigmaReference: Story = {}
