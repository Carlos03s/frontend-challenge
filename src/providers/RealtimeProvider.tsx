import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, type ReactNode } from 'react'

import { queryKeys } from '@/consts/queryKeys'
import { browserMocksReady } from '@/mocks/browserMocksReady'
import type { NftUpdatedEventPayload } from '@/types/api/nfts'
import type { OrderUpdatedEventPayload } from '@/types/api/orders'
import { sessionChangedEventName } from '@/utils/sessionToken'
import { shouldApplyRealtimeEvent } from '@/utils/shouldApplyRealtimeEvent'

type RealtimeProviderProps = {
  children: ReactNode
}

export function RealtimeProvider({ children }: RealtimeProviderProps) {
  const queryClient = useQueryClient()
  const [sessionVersion, setSessionVersion] = useState(0)

  useEffect(() => {
    const handleSessionChanged = () => {
      setSessionVersion((currentVersion) => currentVersion + 1)
    }

    window.addEventListener(sessionChangedEventName, handleSessionChanged)

    return () => {
      window.removeEventListener(sessionChangedEventName, handleSessionChanged)
    }
  }, [])

  useEffect(() => {
    let isDisposed = false

    const connection = browserMocksReady
      .then(() => import('@/api/socket/createSocketClient'))
      .then((socketModule) => {
      if (isDisposed) {
        return null
      }

      const socket = socketModule.connectSocketWithSession()

      const handleNftUpdated = (payload: NftUpdatedEventPayload) => {
        const shouldApply = shouldApplyRealtimeEvent(payload)

        if (!shouldApply) {
          return
        }

        void queryClient.invalidateQueries({ queryKey: ['nfts'] })
        void queryClient.invalidateQueries({ queryKey: queryKeys.cart })
        void queryClient.invalidateQueries({ queryKey: queryKeys.cartQuote })
      }

      const handleOrderUpdated = (payload: OrderUpdatedEventPayload) => {
        const shouldApply = shouldApplyRealtimeEvent(payload)

        if (!shouldApply) {
          return
        }

        void queryClient.invalidateQueries({ queryKey: queryKeys.order(payload.order.id) })
        void queryClient.invalidateQueries({ queryKey: queryKeys.cart })
      }

      socket.on('nft.updated', handleNftUpdated)
      socket.on('order.updated', handleOrderUpdated)

      return {
        socket,
        socketModule,
        handleNftUpdated,
        handleOrderUpdated,
      }
    })

    return () => {
      isDisposed = true

      void connection.then((activeConnection) => {
        if (activeConnection === null) {
          return
        }

        activeConnection.socket.off('nft.updated', activeConnection.handleNftUpdated)
        activeConnection.socket.off('order.updated', activeConnection.handleOrderUpdated)
        activeConnection.socketModule.disconnectSocketClient()
      })
    }
  }, [queryClient, sessionVersion])

  return children
}
