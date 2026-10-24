import type { MockScenarioName } from '@/types/api/mockControl'

export type MockDbEdition = {
  key: string
  label: string
  maxSupply: number | null
  available: number
}

export type MockDbNft = {
  id: string
  slug: string
  name: string
  tokenId: string
  collectionId: string
  collectionLabel: string
  networkId: string
  priceEth: string
  imageSrc: string
  imageAlt: string
  description: string
  attributesLabel: string
  isRare: boolean
  version: number
  favoriteCount?: number
  editions: MockDbEdition[]
}

export type MockDbUser = {
  id: string
  username: string
  email: string
  displayName: string
  password: string
  ensName: string
  walletAlias: string
  avatarUrl: string | null
  favoriteNftIds: string[]
}

export type MockDbSession = {
  token: string
  userId: string
  expiresAt: string
}

export type MockDbCartItem = {
  id: string
  nftId: string
  editionKey: string
  quantity: number
  unitPriceEth: string
  nftVersion: number
}

export type MockDbCart = {
  id: string
  ownerUserId: string | null
  guestId: string | null
  items: MockDbCartItem[]
  promoCode: string | null
  quoteVersion: number
}

export type MockDbWallet = {
  id: string
  userId: string
  displayName: string
  walletAlias: string
  networkId: string
  profileName: string
  address: string
  ensOrSecondary: string
  walletType: string
  referralCode: string
  email: string
  ensName: string
  isPrimary: boolean
}

export type MockDbOrder = {
  id: string
  userId: string
  status: 'pending' | 'confirmed' | 'rejected'
  version: number
  createdAt: string
  updatedAt: string
  transactionHash: string | null
  walletId: string
  networkId: string
  subtotalEth: string
  discountEth: string
  networkFeeEth: string
  totalEth: string
  items: MockDbCartItem[]
  quoteVersion: number
  idempotencyKey: string
  requestFingerprint: string
}

export type MockDbPromo = {
  code: string
  label: string
  discountEth: string
  isExpired: boolean
}

export type MockDbState = {
  schemaVersion: 1
  scenario: MockScenarioName
  nfts: MockDbNft[]
  users: MockDbUser[]
  sessions: MockDbSession[]
  carts: MockDbCart[]
  wallets: MockDbWallet[]
  orders: MockDbOrder[]
  promos: MockDbPromo[]
  idempotencyIndex: Record<string, string>
  eventSequence: number
}
