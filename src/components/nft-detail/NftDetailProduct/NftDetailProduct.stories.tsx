import type { Meta, StoryObj } from '@storybook/react-vite'

import { NftDetailProduct } from '@/components/nft-detail/NftDetailProduct/NftDetailProduct'
import {
  nftDetailStoryGalleryProps,
  nftDetailStoryPurchasePanelProps,
} from '@/consts/nftDetailStoryContent'

const meta = {
  title: 'NFT Detail/NftDetailProduct',
  component: NftDetailProduct,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    galleryProps: nftDetailStoryGalleryProps,
    purchasePanelProps: nftDetailStoryPurchasePanelProps,
  },
} satisfies Meta<typeof NftDetailProduct>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
