import type { QueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/consts/queryKeys'
import { clearSessionToken } from '@/utils/sessionToken'

export function clearPrivateSessionState(queryClient: QueryClient): void {
  clearSessionToken()
  void import('@/api/socket/createSocketClient').then((socketModule) => {
    socketModule.disconnectSocketClient()
  })
  queryClient.removeQueries({ queryKey: queryKeys.session })
  queryClient.removeQueries({ queryKey: queryKeys.profile })
  queryClient.removeQueries({ queryKey: queryKeys.wallets })
  queryClient.removeQueries({ queryKey: queryKeys.favorites })
  queryClient.removeQueries({ queryKey: queryKeys.cart })
  queryClient.removeQueries({ queryKey: queryKeys.cartQuote })
  queryClient.removeQueries({ queryKey: ['orders'] })
}
