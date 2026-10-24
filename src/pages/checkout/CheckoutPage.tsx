import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { PageContent } from '@/components/layout/PageContent/PageContent'
import { CartSkeleton } from '@/components/skeleton/CartSkeleton/CartSkeleton'
import { CheckoutPaymentSection } from '@/components/checkout/CheckoutPaymentSection/CheckoutPaymentSection'
import { OrderConfirmationModal } from '@/components/order/OrderConfirmationModal/OrderConfirmationModal'
import { createOrder, fetchOrder } from '@/api/ordersApi'
import { fetchCartQuote } from '@/api/cartApi'
import { fetchWallets } from '@/api/walletsApi'
import { activeOrderStorageKey } from '@/consts/storageKeys'
import { queryKeys } from '@/consts/queryKeys'
import { mapCheckoutQuoteToPaymentSectionProps } from '@/utils/mapCheckoutQuoteToPaymentSection'
import { mapOrderDtoToConfirmationModalProps } from '@/utils/mapOrderDtoToConfirmationModal'

type WalletLinkStatus = 'connected' | 'disconnected' | 'refused'

const walletLinkStatusLabels: Record<WalletLinkStatus, string> = {
  connected: 'Carteira conectada',
  disconnected: 'Carteira desconectada',
  refused: 'Conexão da carteira recusada',
}

function readStoredOrderId(): string | null {
  const storedOrderId = sessionStorage.getItem(activeOrderStorageKey)

  if (storedOrderId === null || storedOrderId.length === 0) {
    return null
  }

  return storedOrderId
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const idempotencyKeyRef = useRef<string>(crypto.randomUUID())
  const [selectedWalletId, setSelectedWalletId] = useState('')
  const [walletLinkStatus, setWalletLinkStatus] = useState<WalletLinkStatus>('connected')
  const [activeOrderId, setActiveOrderId] = useState<string | null>(readStoredOrderId)
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  const [visibleConfirmedOrderId, setVisibleConfirmedOrderId] = useState<string | undefined>(undefined)

  const quoteQuery = useQuery({
    queryKey: queryKeys.cartQuote,
    queryFn: fetchCartQuote,
  })

  const walletsQuery = useQuery({
    queryKey: queryKeys.wallets,
    queryFn: fetchWallets,
  })

  const orderQuery = useQuery({
    queryKey: queryKeys.order(activeOrderId ?? 'none'),
    queryFn: () => fetchOrder(activeOrderId ?? ''),
    enabled: activeOrderId !== null,
    refetchInterval: (query) => {
      const order = query.state.data

      if (order === undefined) {
        return 2000
      }

      const isPending = order.status === 'pending'

      return isPending ? 2000 : false
    },
  })

  const primaryWallet = walletsQuery.data?.primary ?? null
  const secondaryWallet = walletsQuery.data?.secondary ?? null
  const walletList = [primaryWallet, secondaryWallet].filter((wallet) => wallet !== null)

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const quote = quoteQuery.data

      if (quote === undefined || selectedWalletId.length === 0) {
        throw new Error('Cotação ou carteira indisponível')
      }

      if (quote.isStale) {
        throw new Error('Cotação desatualizada')
      }

      const isWalletConnected = walletLinkStatus === 'connected'

      if (!isWalletConnected) {
        throw new Error('Conecte a carteira antes de confirmar')
      }

      const selectedWallet = walletList.find((wallet) => wallet.id === selectedWalletId)

      return createOrder(
        {
          quoteVersion: quote.cart.quoteVersion,
          walletId: selectedWalletId,
          networkId: selectedWallet?.networkId ?? 'ethereum',
        },
        idempotencyKeyRef.current,
      )
    },
    onSuccess: async (order) => {
      sessionStorage.setItem(activeOrderStorageKey, order.id)
      setActiveOrderId(order.id)
      await queryClient.invalidateQueries({ queryKey: queryKeys.cart })
      await queryClient.invalidateQueries({ queryKey: queryKeys.order(order.id) })
    },
  })

  const hasPrimaryWallet = primaryWallet !== null
  const hasSelectedWallet = selectedWalletId.length > 0

  if (hasPrimaryWallet && !hasSelectedWallet) {
    setSelectedWalletId(primaryWallet.id)
  }

  const currentOrder = orderQuery.data
  const isOrderConfirmed = currentOrder?.status === 'confirmed'
  const isOrderRejected = currentOrder?.status === 'rejected'
  const isOrderPending = currentOrder?.status === 'pending'
  const confirmedOrderId = isOrderConfirmed ? currentOrder.id : undefined
  const hasNewConfirmedOrder =
    confirmedOrderId !== undefined && confirmedOrderId !== visibleConfirmedOrderId

  if (hasNewConfirmedOrder) {
    setVisibleConfirmedOrderId(confirmedOrderId)
    setIsConfirmationVisible(true)
  }

  if (quoteQuery.isPending || walletsQuery.isPending) {
    return <CartSkeleton />
  }

  if (quoteQuery.data === undefined) {
    return <p className="font-mono text-base text-text-accent">Não foi possível carregar a cotação.</p>
  }

  if (quoteQuery.data.isStale) {
    return (
      <p className="font-mono text-base text-text-accent">
        A cotação mudou. Revise o carrinho antes de continuar.
      </p>
    )
  }

  const handleConfirmClick = () => {
    createOrderMutation.mutate()
  }

  const handleWalletOptionClick = (walletOptionId: string) => {
    setSelectedWalletId(walletOptionId)
    setWalletLinkStatus('connected')
  }

  const handleConnectWalletClick = () => {
    setWalletLinkStatus('connected')
  }

  const handleRefuseWalletClick = () => {
    setWalletLinkStatus('refused')
  }

  const handleDisconnectWalletClick = () => {
    setWalletLinkStatus('disconnected')
  }

  const isWalletConnected = walletLinkStatus === 'connected'
  const isConfirmDisabled = !isWalletConnected || createOrderMutation.isPending

  const paymentSectionProps = mapCheckoutQuoteToPaymentSectionProps(
    quoteQuery.data,
    walletList,
    selectedWalletId,
    {
      onConfirmClick: handleConfirmClick,
      onWalletOptionClick: handleWalletOptionClick,
      connectionStatusLabel: walletLinkStatusLabels[walletLinkStatus],
      isConfirmDisabled,
      onConnectWalletClick: handleConnectWalletClick,
      onRefuseWalletClick: handleRefuseWalletClick,
      onDisconnectWalletClick: handleDisconnectWalletClick,
    },
  )

  let orderStatusMessage: string | undefined

  if (isOrderRejected) {
    orderStatusMessage = 'Pagamento recusado. Os itens continuam no carrinho.'
  }

  if (isOrderPending) {
    orderStatusMessage = 'Pagamento pendente. A confirmação chega sem criar outro pedido.'
  }
  const hasOrderStatusMessage = orderStatusMessage !== undefined
  const orderStatusElement = hasOrderStatusMessage ? (
    <p className="font-mono text-base text-text-accent" role="status">
      {orderStatusMessage}
    </p>
  ) : null

  const handleCloseConfirmation = () => {
    sessionStorage.removeItem(activeOrderStorageKey)
    setIsConfirmationVisible(false)
    void navigate({ to: '/' })
  }

  const confirmationModalElement =
    isConfirmationVisible && currentOrder !== undefined && currentOrder.status === 'confirmed' ? (
      <OrderConfirmationModal
        {...mapOrderDtoToConfirmationModalProps(currentOrder)}
        onCloseClick={handleCloseConfirmation}
      />
    ) : null

  const paymentElement = <CheckoutPaymentSection {...paymentSectionProps} />

  return (
    <PageContent className="gap-8">
      {orderStatusElement}
      {paymentElement}
      {confirmationModalElement}
    </PageContent>
  )
}
