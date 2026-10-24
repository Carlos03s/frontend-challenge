import type {
  CartItemRowProps,
  CartItemsPanelProps,
  CartTableHeaderProps,
  CartWalletSummaryProps,
} from '@/types/cart'

export const cartStoryTableHeaderProps: CartTableHeaderProps = {
  nftsColumnLabel: 'NFTs',
  priceColumnLabel: 'Preço',
  editionsColumnLabel: 'Edições',
  totalColumnLabel: 'Total',
}

export const cartStoryItemRowProps: CartItemRowProps = {
  name: 'Emerald Ape #042',
  tokenIdLabel: 'ID do token: #0042',
  imageSrc: '/assets/home/figma/ape-green.webp',
  imageAlt: 'Emerald Ape #042',
  unitPriceLabel: '1.19 ETH',
  quantityLabel: '2',
  lineTotalLabel: '2.38 ETH',
  decreaseQuantityAriaLabel: 'Diminuir quantidade',
  increaseQuantityAriaLabel: 'Aumentar quantidade',
  removeAriaLabel: 'Remover item',
  decreaseIconSrc: '/assets/cart/figma/minus.svg',
  increaseIconSrc: '/assets/cart/figma/plus.svg',
  removeIconSrc: '/assets/cart/figma/delete.svg',
}

export const cartStoryWalletSummaryProps: CartWalletSummaryProps = {
  title: 'Resumo da carteira',
  promoCodeTitle: 'Código promocional',
  promoCodePlaceholder: 'Digite o código promocional...',
  promoApplyLabel: 'Aplicar',
  subtotalLabel: 'Subtotal',
  subtotalValueLabel: '26.83 ETH',
  discountLabel: 'Desconto do lançamento',
  discountValueLabel: '(-) 00.00',
  networkFeeLabel: 'Taxa de rede',
  networkFeeValueLabel: '0.016 ETH',
  networkFeeHintLabel: 'Taxa estimada',
  totalLabel: 'Total',
  totalValueLabel: '26.846 ETH',
  checkoutLabel: 'Conectar e finalizar',
  continueShoppingLabel: 'Continuar explorando',
}

export const cartStoryItemRowVioletProps: CartItemRowProps = {
  name: 'Violet Nomad #314',
  tokenIdLabel: 'ID do token: #0314',
  imageSrc: '/assets/home/figma/ape-purple.webp',
  imageAlt: 'Violet Nomad #314',
  unitPriceLabel: '1.39 ETH',
  quantityLabel: '6',
  lineTotalLabel: '8.34 ETH',
  decreaseQuantityAriaLabel: 'Diminuir quantidade',
  increaseQuantityAriaLabel: 'Aumentar quantidade',
  removeAriaLabel: 'Remover item',
  decreaseIconSrc: '/assets/cart/figma/minus.svg',
  increaseIconSrc: '/assets/cart/figma/plus.svg',
  removeIconSrc: '/assets/cart/figma/delete.svg',
}

export const cartStoryItemRowIvoryProps: CartItemRowProps = {
  name: 'Ivory Baron #088',
  tokenIdLabel: 'ID do token: #0088',
  imageSrc: '/assets/home/figma/ape-black.webp',
  imageAlt: 'Ivory Baron #088',
  unitPriceLabel: '1.79 ETH',
  quantityLabel: '9',
  lineTotalLabel: '16.11 ETH',
  decreaseQuantityAriaLabel: 'Diminuir quantidade',
  increaseQuantityAriaLabel: 'Aumentar quantidade',
  removeAriaLabel: 'Remover item',
  decreaseIconSrc: '/assets/cart/figma/minus.svg',
  increaseIconSrc: '/assets/cart/figma/plus.svg',
  removeIconSrc: '/assets/cart/figma/delete.svg',
}

export const cartStoryItemsPanelProps: CartItemsPanelProps = {
  headerProps: cartStoryTableHeaderProps,
  itemRows: [cartStoryItemRowProps, cartStoryItemRowVioletProps, cartStoryItemRowIvoryProps],
}
