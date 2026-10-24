import { httpClient } from '@/api/httpClient'
import type { NftDetailDto, NftListQuery, NftListResponse } from '@/types/api/nfts'

export async function fetchNftList(query: NftListQuery): Promise<NftListResponse> {
  const collectionIds = query.collectionIds?.join(',')
  const networkIds = query.networkIds?.join(',')
  const response = await httpClient.get<NftListResponse>('/nfts', {
    params: {
      ...query,
      collectionIds: collectionIds !== undefined && collectionIds.length > 0 ? collectionIds : undefined,
      networkIds: networkIds !== undefined && networkIds.length > 0 ? networkIds : undefined,
    },
  })
  return response.data
}

export async function fetchNftDetail(nftId: string): Promise<NftDetailDto> {
  const response = await httpClient.get<NftDetailDto>(`/nfts/${nftId}`)
  return response.data
}
