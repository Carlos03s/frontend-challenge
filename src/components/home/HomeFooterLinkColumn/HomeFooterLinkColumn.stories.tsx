import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeFooterLinkColumn } from '@/components/home/HomeFooterLinkColumn/HomeFooterLinkColumn'
import { homeFooterStoryLinkColumns } from '@/consts/homeFooterStoryContent'

const meta = {
  title: 'Home/Footer/HomeFooterLinkColumn',
  component: HomeFooterLinkColumn,
  parameters: {
    layout: 'centered',
  },
  args: homeFooterStoryLinkColumns[0],
} satisfies Meta<typeof HomeFooterLinkColumn>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
