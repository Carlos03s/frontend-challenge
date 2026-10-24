import type { Meta, StoryObj } from '@storybook/react-vite'

import { NftDetailDesktopReference } from '@/components/reference/NftDetailDesktopReference/NftDetailDesktopReference'

const meta = {
  title: 'Reference/NftDetailDesktop',
  component: NftDetailDesktopReference,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof NftDetailDesktopReference>

export default meta

type Story = StoryObj<typeof meta>

export const FigmaReference: Story = {}
