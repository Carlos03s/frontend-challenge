import { getMockDatabaseState, updateMockDatabaseState } from '@/mocks/db/mockDatabase'
import type { UpsertWalletRequest, WalletDto, WalletsResponse } from '@/types/api/wallets'

function mapWalletToDto(wallet: ReturnType<typeof getMockDatabaseState>['wallets'][number]): WalletDto {
  return {
    id: wallet.id,
    displayName: wallet.displayName,
    walletAlias: wallet.walletAlias,
    networkId: wallet.networkId,
    profileName: wallet.profileName,
    address: wallet.address,
    ensOrSecondary: wallet.ensOrSecondary,
    walletType: wallet.walletType,
    referralCode: wallet.referralCode,
    email: wallet.email,
    ensName: wallet.ensName,
  }
}

export function getMockWallets(userId: string): WalletsResponse {
  const dbState = getMockDatabaseState()
  const userWallets = dbState.wallets.filter((wallet) => wallet.userId === userId)
  const primaryWallet = userWallets.find((wallet) => wallet.isPrimary) ?? null
  const secondaryWallet = userWallets.find((wallet) => !wallet.isPrimary) ?? null

  return {
    primary: primaryWallet ? mapWalletToDto(primaryWallet) : null,
    secondary: secondaryWallet ? mapWalletToDto(secondaryWallet) : null,
  }
}

export function upsertMockPrimaryWallet(userId: string, payload: UpsertWalletRequest): WalletsResponse {
  updateMockDatabaseState((state) => {
    const existingPrimary = state.wallets.find((wallet) => wallet.userId === userId && wallet.isPrimary)

    if (existingPrimary !== undefined) {
      existingPrimary.displayName = payload.displayName
      existingPrimary.walletAlias = payload.walletAlias
      existingPrimary.networkId = payload.networkId
      existingPrimary.profileName = payload.profileName
      existingPrimary.address = payload.address
      existingPrimary.ensOrSecondary = payload.ensOrSecondary ?? ''
      existingPrimary.walletType = payload.walletType
      existingPrimary.referralCode = payload.referralCode ?? ''
      existingPrimary.email = payload.email
      existingPrimary.ensName = payload.ensName
      return
    }

    state.wallets.push({
      id: `wallet-${crypto.randomUUID()}`,
      userId,
      displayName: payload.displayName,
      walletAlias: payload.walletAlias,
      networkId: payload.networkId,
      profileName: payload.profileName,
      address: payload.address,
      ensOrSecondary: payload.ensOrSecondary ?? '',
      walletType: payload.walletType,
      referralCode: payload.referralCode ?? '',
      email: payload.email,
      ensName: payload.ensName,
      isPrimary: true,
    })
  })

  return getMockWallets(userId)
}

export function upsertMockSecondaryWallet(userId: string, payload: UpsertWalletRequest): WalletsResponse {
  updateMockDatabaseState((state) => {
    const existingSecondary = state.wallets.find((wallet) => wallet.userId === userId && !wallet.isPrimary)

    if (existingSecondary !== undefined) {
      existingSecondary.displayName = payload.displayName
      existingSecondary.walletAlias = payload.walletAlias
      existingSecondary.networkId = payload.networkId
      existingSecondary.profileName = payload.profileName
      existingSecondary.address = payload.address
      existingSecondary.ensOrSecondary = payload.ensOrSecondary ?? ''
      existingSecondary.walletType = payload.walletType
      existingSecondary.referralCode = payload.referralCode ?? ''
      existingSecondary.email = payload.email
      existingSecondary.ensName = payload.ensName
      return
    }

    state.wallets.push({
      id: `wallet-${crypto.randomUUID()}`,
      userId,
      displayName: payload.displayName,
      walletAlias: payload.walletAlias,
      networkId: payload.networkId,
      profileName: payload.profileName,
      address: payload.address,
      ensOrSecondary: payload.ensOrSecondary ?? '',
      walletType: payload.walletType,
      referralCode: payload.referralCode ?? '',
      email: payload.email,
      ensName: payload.ensName,
      isPrimary: false,
    })
  })

  return getMockWallets(userId)
}
