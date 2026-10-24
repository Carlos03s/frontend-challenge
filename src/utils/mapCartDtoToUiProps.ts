import type { CartDto, CartItemDto } from '@/types/api/cart'
import type { CartItemRowProps, CartItemsPanelProps, CartTableHeaderProps, CartWalletSummaryProps } from '@/types/cart'
import { formatEthLabel } from '@/utils/formatEthLabel'

const cartTableHeaderProps: CartTableHeaderProps = {
  nftsColumnLabel: 'NFTs',
  priceColumnLabel: 'Preço',
  editionsColumnLabel: 'Edições',
  totalColumnLabel: 'Total',
}

function mapCartItemDtoToRowProps(
  item: CartItemDto,
  handlers: {
    onDecreaseQuantityClick?: () => void
    onIncreaseQuantityClick?: () => void
    onRemoveClick?: () => void
  },
): CartItemRowProps {
  return {
    name: item.nftName,
    tokenIdLabel: item.tokenIdLabel,
    imageSrc: item.imageSrc,
    imageAlt: item.imageAlt,
    unitPriceLabel: formatEthLabel(item.unitPriceEth),
    quantityLabel: String(item.quantity),
    lineTotalLabel: formatEthLabel(item.lineTotalEth),
    decreaseQuantityAriaLabel: 'Diminuir quantidade',
    increaseQuantityAriaLabel: 'Aumentar quantidade',
    removeAriaLabel: 'Remover item',
    decreaseIconSrc: '/assets/cart/figma/minus.svg',
    increaseIconSrc: '/assets/cart/figma/plus.svg',
    removeIconSrc: '/assets/cart/figma/delete.svg',
    onDecreaseQuantityClick: handlers.onDecreaseQuantityClick,
    onIncreaseQuantityClick: handlers.onIncreaseQuantityClick,
    onRemoveClick: handlers.onRemoveClick,
  }
}

export function mapCartDtoToItemsPanelProps(
  cart: CartDto,
  itemHandlers: (cartItemId: string) => {
    onDecreaseQuantityClick: () => void
    onIncreaseQuantityClick: () => void
    onRemoveClick: () => void
  },
): CartItemsPanelProps {
  const itemRows = cart.items.map((item) =>
    mapCartItemDtoToRowProps(item, itemHandlers(item.id)),
  )

  return {
    headerProps: cartTableHeaderProps,
    itemRows,
  }
}

export function mapCartDtoToWalletSummaryProps(
  cart: CartDto,
  handlers: {
    promoCodeValue?: string
    onPromoCodeChange?: (value: string) => void
    onPromoApplyClick?: () => void
    onCheckoutClick?: () => void
    onContinueShoppingClick?: () => void
  },
): CartWalletSummaryProps {
  const discountValueLabel = cart.promo ? `(-) ${cart.discountEth}` : '(-) 00.00'

  return {
    title: 'Resumo da carteira',
    promoCodeTitle: 'Código promocional',
    promoCodePlaceholder: 'Digite o código promocional...',
    promoApplyLabel: 'Aplicar',
    subtotalLabel: 'Subtotal',
    subtotalValueLabel: formatEthLabel(cart.subtotalEth),
    discountLabel: cart.promo?.label ?? 'Desconto do lançamento',
    discountValueLabel,
    networkFeeLabel: 'Taxa de rede',
    networkFeeValueLabel: formatEthLabel(cart.networkFeeEth),
    networkFeeHintLabel: 'Taxa estimada',
    totalLabel: 'Total',
    totalValueLabel: formatEthLabel(cart.totalEth),
    checkoutLabel: 'Conectar e finalizar',
    continueShoppingLabel: 'Continuar explorando',
    promoCodeValue: handlers.promoCodeValue,
    onPromoCodeChange: handlers.onPromoCodeChange,
    onPromoApplyClick: handlers.onPromoApplyClick,
    onCheckoutClick: handlers.onCheckoutClick,
    onContinueShoppingClick: handlers.onContinueShoppingClick,
  }
}

export function countCartItems(cart: CartDto | undefined): number {
  if (cart === undefined) {
    return 0
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0)
}
