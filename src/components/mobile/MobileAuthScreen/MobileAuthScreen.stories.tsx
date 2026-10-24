import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileAuthScreen } from '@/components/mobile/MobileAuthScreen/MobileAuthScreen'
import { mobileStorySignInProps, mobileStorySignUpProps } from '@/consts/mobileStoryContent'

const meta = {
  title: 'Mobile/MobileAuthScreen',
  component: MobileAuthScreen,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
} satisfies Meta<typeof MobileAuthScreen>

export default meta

type Story = StoryObj<typeof meta>

export const SignIn: Story = {
  args: mobileStorySignInProps,
}

export const SignUp: Story = {
  args: mobileStorySignUpProps,
}
