import type { Meta, StoryObj } from '@storybook/react-vite'

import { AccountSidebar } from '@/components/account/AccountSidebar/AccountSidebar'
import {
  accountStorySidebarProfileActive,
  accountStorySidebarWalletsActive,
} from '@/consts/accountStoryContent'

const meta = {
  title: 'Account/AccountSidebar',
  component: AccountSidebar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof AccountSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const ProfileActive: Story = {
  args: accountStorySidebarProfileActive,
}

export const WalletsActive: Story = {
  args: accountStorySidebarWalletsActive,
}
