import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { AuthSignUpModal } from '@/components/auth/AuthSignUpModal/AuthSignUpModal'
import { authStorySignUpModalProps } from '@/consts/authStoryContent'

const meta = {
  title: 'Auth/AuthSignUpModal',
  component: AuthSignUpModal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...authStorySignUpModalProps,
    onSubmitClick: fn(),
    onCloseClick: fn(),
  },
} satisfies Meta<typeof AuthSignUpModal>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
