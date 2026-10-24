export type CartTableHeaderProps = {
  nftsColumnLabel: string
  priceColumnLabel: string
  editionsColumnLabel: string
  totalColumnLabel: string
}

export type CartItemRowProps = {
  name: string
  tokenIdLabel: string
  imageSrc: string
  imageAlt: string
  unitPriceLabel: string
  quantityLabel: string
  lineTotalLabel: string
  decreaseQuantityAriaLabel: string
  increaseQuantityAriaLabel: string
  removeAriaLabel: string
  decreaseIconSrc: string
  increaseIconSrc: string
  removeIconSrc: string
  onDecreaseQuantityClick?: () => void
  onIncreaseQuantityClick?: () => void
  onRemoveClick?: () => void
}

export type CartItemsPanelProps = {
  headerProps: CartTableHeaderProps
  itemRows: CartItemRowProps[]
}

export type CartWalletSummaryProps = {
  title: string
  promoCodeTitle: string
  promoCodePlaceholder: string
  promoApplyLabel: string
  subtotalLabel: string
  subtotalValueLabel: string
  discountLabel: string
  discountValueLabel: string
  networkFeeLabel: string
  networkFeeValueLabel: string
  networkFeeHintLabel: string
  totalLabel: string
  totalValueLabel: string
  checkoutLabel: string
  continueShoppingLabel: string
  promoCodeValue?: string
  onPromoCodeChange?: (value: string) => void
  onPromoApplyClick?: () => void
  onCheckoutClick?: () => void
  onContinueShoppingClick?: () => void
}
