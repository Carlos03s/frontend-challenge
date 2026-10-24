import type { MockDbUser } from '@/mocks/db/mockDbTypes'

export const mockFixtureUsers: MockDbUser[] = [
  {
    id: 'user-collector',
    username: 'collector',
    email: 'collector@kurio.test',
    displayName: 'Collector One',
    password: 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea',
    ensName: 'collector.eth',
    walletAlias: 'Carteira principal',
    avatarUrl: null,
    favoriteNftIds: ['nft-emerald-ape-042'],
  },
  {
    id: 'user-artist',
    username: 'artist',
    email: 'artist@kurio.test',
    displayName: 'Artist Two',
    password: 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea',
    ensName: 'artist.eth',
    walletAlias: 'Studio wallet',
    avatarUrl: null,
    favoriteNftIds: [],
  },
]

export const mockFixtureCredentials = {
  collector: {
    email: 'collector@kurio.test',
    password: 'Password123!',
  },
  artist: {
    email: 'artist@kurio.test',
    password: 'Password123!',
  },
} as const
