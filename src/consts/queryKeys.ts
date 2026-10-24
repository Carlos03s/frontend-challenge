export const queryKeys = {
  session: ['session'] as const,
  nftList: (filters: Record<string, unknown>) => ['nfts', 'list', filters] as const,
  nftDetail: (nftId: string) => ['nfts', 'detail', nftId] as const,
  favorites: ['favorites'] as const,
  cart: ['cart'] as const,
  cartQuote: ['cart', 'quote'] as const,
  order: (orderId: string) => ['orders', orderId] as const,
  profile: ['profile'] as const,
  wallets: ['wallets'] as const,
}
