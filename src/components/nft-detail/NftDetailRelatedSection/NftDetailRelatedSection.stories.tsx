import type { Meta, StoryObj } from '@storybook/react-vite'

import { NftDetailRelatedSection } from '@/components/nft-detail/NftDetailRelatedSection/NftDetailRelatedSection'
import {
  nftDetailRelatedStoryCards,
  nftDetailRelatedStoryTitle,
} from '@/consts/nftDetailRelatedStoryContent'

const meta = {
  title: 'NFT Detail/NftDetailRelatedSection',
  component: NftDetailRelatedSection,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    title: nftDetailRelatedStoryTitle,
    nftCards: nftDetailRelatedStoryCards,
  },
} satisfies Meta<typeof NftDetailRelatedSection>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
