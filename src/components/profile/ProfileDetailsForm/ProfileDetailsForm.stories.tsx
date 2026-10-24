import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { ProfileDetailsForm } from '@/components/profile/ProfileDetailsForm/ProfileDetailsForm'
import { profileStoryDetailsFormProps } from '@/consts/profileStoryContent'

const meta = {
  title: 'Profile/ProfileDetailsForm',
  component: ProfileDetailsForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...profileStoryDetailsFormProps,
    onSaveClick: fn(),
  },
} satisfies Meta<typeof ProfileDetailsForm>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
