import type { Meta, StoryObj } from '@storybook/react-vite'

import { AccountWalletsDesktopReference } from '@/components/reference/AccountWalletsDesktopReference/AccountWalletsDesktopReference'

const meta = {
  title: 'Reference/AccountWalletsDesktop',
  component: AccountWalletsDesktopReference,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof AccountWalletsDesktopReference>

export default meta

type Story = StoryObj<typeof meta>

export const FigmaReference: Story = {}
