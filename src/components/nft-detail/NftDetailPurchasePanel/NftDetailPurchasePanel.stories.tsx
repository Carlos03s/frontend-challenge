import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { NftDetailPurchasePanel } from '@/components/nft-detail/NftDetailPurchasePanel/NftDetailPurchasePanel'
import { nftDetailStoryPurchasePanelProps } from '@/consts/nftDetailStoryContent'

const meta = {
  title: 'NftDetail/NftDetailPurchasePanel',
  component: NftDetailPurchasePanel,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    ...nftDetailStoryPurchasePanelProps,
    onBuyClick: fn(),
    onFavoriteClick: fn(),
    onDecreaseQuantityClick: fn(),
    onIncreaseQuantityClick: fn(),
  },
} satisfies Meta<typeof NftDetailPurchasePanel>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
