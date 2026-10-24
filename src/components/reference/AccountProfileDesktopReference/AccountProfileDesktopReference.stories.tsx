import type { Meta, StoryObj } from '@storybook/react-vite'

import { AccountProfileDesktopReference } from '@/components/reference/AccountProfileDesktopReference/AccountProfileDesktopReference'

const meta = {
  title: 'Reference/AccountProfileDesktop',
  component: AccountProfileDesktopReference,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof AccountProfileDesktopReference>

export default meta

type Story = StoryObj<typeof meta>

export const FigmaReference: Story = {}
