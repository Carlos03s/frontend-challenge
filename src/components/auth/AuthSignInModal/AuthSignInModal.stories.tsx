import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { AuthSignInModal } from '@/components/auth/AuthSignInModal/AuthSignInModal'
import { authStorySignInModalProps } from '@/consts/authStoryContent'

const meta = {
  title: 'Auth/AuthSignInModal',
  component: AuthSignInModal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...authStorySignInModalProps,
    onSubmitClick: fn(),
    onCloseClick: fn(),
    onPasswordToggleClick: fn(),
  },
} satisfies Meta<typeof AuthSignInModal>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
