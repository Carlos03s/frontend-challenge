import { httpClient } from '@/api/httpClient'
import type { FavoriteListResponse } from '@/types/api/favorites'

export async function fetchFavorites(): Promise<FavoriteListResponse> {
  const response = await httpClient.get<FavoriteListResponse>('/favorites')
  return response.data
}

export async function addFavorite(nftId: string): Promise<FavoriteListResponse> {
  const response = await httpClient.post<FavoriteListResponse>(`/favorites/${nftId}`)
  return response.data
}

export async function removeFavorite(nftId: string): Promise<FavoriteListResponse> {
  const response = await httpClient.delete<FavoriteListResponse>(`/favorites/${nftId}`)
  return response.data
}
