import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileHomeReference } from '@/components/reference/MobileHomeReference/MobileHomeReference'

const meta = {
  title: 'Reference/MobileHome',
  component: MobileHomeReference,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof MobileHomeReference>

export default meta

type Story = StoryObj<typeof meta>

export const FigmaReference: Story = {}
