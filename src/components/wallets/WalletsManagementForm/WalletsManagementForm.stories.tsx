import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { WalletsManagementForm } from '@/components/wallets/WalletsManagementForm/WalletsManagementForm'
import { walletsStoryManagementFormProps } from '@/consts/walletsStoryContent'

const meta = {
  title: 'Wallets/WalletsManagementForm',
  component: WalletsManagementForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...walletsStoryManagementFormProps,
    onSaveWalletClick: fn(),
  },
} satisfies Meta<typeof WalletsManagementForm>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
