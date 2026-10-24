import { httpClient } from '@/api/httpClient'
import type { UpsertWalletRequest, WalletsResponse } from '@/types/api/wallets'

export async function fetchWallets(): Promise<WalletsResponse> {
  const response = await httpClient.get<WalletsResponse>('/wallets')
  return response.data
}

export async function upsertPrimaryWallet(payload: UpsertWalletRequest): Promise<WalletsResponse> {
  const response = await httpClient.put<WalletsResponse>('/wallets/primary', payload)
  return response.data
}

export async function upsertSecondaryWallet(payload: UpsertWalletRequest): Promise<WalletsResponse> {
  const response = await httpClient.put<WalletsResponse>('/wallets/secondary', payload)
  return response.data
}
