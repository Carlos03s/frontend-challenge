import type { Meta, StoryObj } from '@storybook/react-vite'

import { AccountPageLayout } from '@/components/account/AccountPageLayout/AccountPageLayout'
import { ProfileDetailsForm } from '@/components/profile/ProfileDetailsForm/ProfileDetailsForm'
import { accountStorySidebarProfileActive } from '@/consts/accountStoryContent'
import { profileStoryDetailsFormProps } from '@/consts/profileStoryContent'

const meta = {
  title: 'Account/AccountPageLayout',
  component: AccountPageLayout,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    sidebarProps: accountStorySidebarProfileActive,
    contentElement: <ProfileDetailsForm {...profileStoryDetailsFormProps} />,
  },
} satisfies Meta<typeof AccountPageLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Profile: Story = {}
