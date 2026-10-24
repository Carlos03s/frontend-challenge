import type { Meta, StoryObj } from '@storybook/react-vite'

import { NftDetailGallery } from '@/components/nft-detail/NftDetailGallery/NftDetailGallery'
import { nftDetailStoryGalleryProps } from '@/consts/nftDetailStoryContent'

const meta = {
  title: 'NftDetail/NftDetailGallery',
  component: NftDetailGallery,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: nftDetailStoryGalleryProps,
} satisfies Meta<typeof NftDetailGallery>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
