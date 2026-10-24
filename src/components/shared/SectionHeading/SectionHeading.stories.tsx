import type { Meta, StoryObj } from '@storybook/react-vite'

import { SectionHeading } from '@/components/shared/SectionHeading/SectionHeading'

const meta = {
  title: 'Shared/SectionHeading',
  component: SectionHeading,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    title: 'Colecionadores também viram',
  },
} satisfies Meta<typeof SectionHeading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
