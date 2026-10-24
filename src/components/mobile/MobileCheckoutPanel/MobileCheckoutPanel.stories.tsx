import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileCheckoutPanel } from '@/components/mobile/MobileCheckoutPanel/MobileCheckoutPanel'
import { mobileStoryCheckoutPanelProps } from '@/consts/mobileStoryContent'

const meta = {
  title: 'Mobile/MobileCheckoutPanel',
  component: MobileCheckoutPanel,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: mobileStoryCheckoutPanelProps,
} satisfies Meta<typeof MobileCheckoutPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
