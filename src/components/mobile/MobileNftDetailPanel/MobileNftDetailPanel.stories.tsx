import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileNftDetailPanel } from '@/components/mobile/MobileNftDetailPanel/MobileNftDetailPanel'
import { mobileStoryNftDetailPanelProps } from '@/consts/mobileStoryContent'

const meta = {
  title: 'Mobile/MobileNftDetailPanel',
  component: MobileNftDetailPanel,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: mobileStoryNftDetailPanelProps,
} satisfies Meta<typeof MobileNftDetailPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
