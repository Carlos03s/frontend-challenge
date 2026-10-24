export type WalletDto = {
  id: string
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
}

export type WalletsResponse = {
  primary: WalletDto | null
  secondary: WalletDto | null
}

export type UpsertWalletRequest = {
  displayName: string
  walletAlias: string
  networkId: string
  profileName: string
  address: string
  ensOrSecondary?: string
  walletType: string
  referralCode?: string
  email: string
  ensName: string
}
