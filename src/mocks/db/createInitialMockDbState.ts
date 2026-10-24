import { mockFixtureNfts } from '@/mocks/fixtures/mockNfts'
import { mockFixturePromos } from '@/mocks/fixtures/mockPromos'
import { mockFixtureUsers } from '@/mocks/fixtures/mockUsers'
import type { MockDbCart, MockDbState, MockDbWallet } from '@/mocks/db/mockDbTypes'
import { getMockScenarioBehavior } from '@/mocks/scenarios/mockScenarioRegistry'
import type { MockScenarioName } from '@/types/api/mockControl'

function createInitialCarts(): MockDbCart[] {
  const collectorCart: MockDbCart = {
    id: 'cart-user-collector',
    ownerUserId: 'user-collector',
    guestId: null,
    promoCode: null,
    quoteVersion: 1,
    items: [
      {
        id: 'cart-item-1',
        nftId: 'nft-emerald-ape-042',
        editionKey: '1-50',
        quantity: 2,
        unitPriceEth: '1.19',
        nftVersion: 1,
      },
      {
        id: 'cart-item-2',
        nftId: 'nft-violet-nomad-314',
        editionKey: '1-50',
        quantity: 6,
        unitPriceEth: '1.39',
        nftVersion: 1,
      },
      {
        id: 'cart-item-3',
        nftId: 'nft-ivory-baron-088',
        editionKey: '1-50',
        quantity: 9,
        unitPriceEth: '1.79',
        nftVersion: 1,
      },
    ],
  }

  return [collectorCart]
}

function createInitialWallets(): MockDbWallet[] {
  const collectorPrimaryWallet: MockDbWallet = {
    id: 'wallet-collector-primary',
    userId: 'user-collector',
    displayName: 'Collector One',
    walletAlias: 'Carteira principal',
    networkId: 'ethereum',
    profileName: 'collector',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    ensOrSecondary: '',
    walletType: 'MetaMask',
    referralCode: '',
    email: 'collector@kurio.test',
    ensName: 'collector.eth',
    isPrimary: true,
  }

  return [collectorPrimaryWallet]
}

export function createInitialMockDbState(scenario: MockScenarioName): MockDbState {
  const scenarioBehavior = getMockScenarioBehavior(scenario)
  const catalogNfts = scenarioBehavior.includeCatalog ? mockFixtureNfts : []

  return {
    schemaVersion: 1,
    scenario,
    nfts: catalogNfts.map((nft) => ({ ...nft, editions: nft.editions.map((edition) => ({ ...edition })) })),
    users: mockFixtureUsers.map((user) => ({ ...user, favoriteNftIds: [...user.favoriteNftIds] })),
    sessions: [],
    carts: createInitialCarts().map((cart) => ({
      ...cart,
      items: cart.items.map((item) => ({ ...item })),
    })),
    wallets: createInitialWallets().map((wallet) => ({ ...wallet })),
    orders: [],
    promos: mockFixturePromos.map((promo) => ({ ...promo })),
    idempotencyIndex: {},
    eventSequence: 0,
  }
}
