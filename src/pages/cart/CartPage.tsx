import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { PageContent } from '@/components/layout/PageContent/PageContent'
import { CartSkeleton } from '@/components/skeleton/CartSkeleton/CartSkeleton'
import { MobileCartScreen } from '@/components/mobile/MobileCartScreen/MobileCartScreen'
import { CartItemsPanel } from '@/components/cart/CartItemsPanel/CartItemsPanel'
import { CartWalletSummary } from '@/components/cart/CartWalletSummary/CartWalletSummary'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import { applyCartPromo, removeCartItem, updateCartItem } from '@/api/cartApi'
import { queryKeys } from '@/consts/queryKeys'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useSessionQuery } from '@/hooks/useSessionQuery'
import { mapCartDtoToItemsPanelProps, mapCartDtoToWalletSummaryProps } from '@/utils/mapCartDtoToUiProps'

export function CartPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [promoCode, setPromoCode] = useState('')
  const cartQuery = useCartQuery()
  const sessionQuery = useSessionQuery()

  const invalidateCart = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.cart })
  }

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItem(itemId, { quantity }),
    onSuccess: invalidateCart,
  })

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => removeCartItem(itemId),
    onSuccess: invalidateCart,
  })

  const applyPromoMutation = useMutation({
    mutationFn: (code: string) => applyCartPromo({ code }),
    onSuccess: invalidateCart,
  })

  if (cartQuery.isPending) {
    return <CartSkeleton />
  }

  if (cartQuery.data === undefined) {
    return <p className="font-mono text-base text-text-accent">Não foi possível carregar o carrinho.</p>
  }

  const cart = cartQuery.data

  const handlePromoApply = () => {
    const trimmedPromoCode = promoCode.trim()
    const hasPromoCode = trimmedPromoCode.length > 0

    if (!hasPromoCode) {
      return
    }

    applyPromoMutation.mutate(trimmedPromoCode)
  }

  const handleCheckoutClick = () => {
    const isAuthenticated = sessionQuery.data !== undefined

    if (!isAuthenticated) {
      void navigate({ to: '/login', search: { redirect: '/pagamento' } })
      return
    }

    void navigate({ to: '/pagamento' })
  }

  const handleContinueShopping = () => {
    void navigate({ to: '/' })
  }

  const itemsPanelProps = mapCartDtoToItemsPanelProps(cart, (cartItemId) => {
    const cartItem = cart.items.find((item) => item.id === cartItemId)
    const currentQuantity = cartItem?.quantity ?? 1

    return {
      onDecreaseQuantityClick: () => {
        updateItemMutation.mutate({ itemId: cartItemId, quantity: Math.max(1, currentQuantity - 1) })
      },
      onIncreaseQuantityClick: () => {
        updateItemMutation.mutate({ itemId: cartItemId, quantity: currentQuantity + 1 })
      },
      onRemoveClick: () => {
        removeItemMutation.mutate(cartItemId)
      },
    }
  })

  const walletSummaryProps = mapCartDtoToWalletSummaryProps(cart, {
    promoCodeValue: promoCode,
    onPromoCodeChange: setPromoCode,
    onPromoApplyClick: handlePromoApply,
    onCheckoutClick: handleCheckoutClick,
    onContinueShoppingClick: handleContinueShopping,
  })

  const breadcrumbElement = <PageBreadcrumb label="Início / Mercado / Carrinho" />

  const cartContentElement = (
    <div className="flex flex-col gap-8 lg:flex-row">
      <CartItemsPanel {...itemsPanelProps} />
      <CartWalletSummary {...walletSummaryProps} />
    </div>
  )

  const handleBackClick = () => {
    void navigate({ to: '/' })
  }

  const mobileCartElement = (
    <MobileCartScreen
      itemRows={itemsPanelProps.itemRows}
      summary={walletSummaryProps}
      title="Carrinho de NFTs"
      onBackClick={handleBackClick}
    />
  )

  return (
    <>
      {mobileCartElement}
      <PageContent className="hidden gap-8 lg:flex">
        {breadcrumbElement}
        {cartContentElement}
      </PageContent>
    </>
  )
}
