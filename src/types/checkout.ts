import type { FormFieldDisplayProps } from '@/types/form'

export type CheckoutReceiptItem = {
  id: string
  name: string
  tokenIdLabel: string
  imageSrc: string
  imageAlt: string
  quantityLabel: string
  subtotalLabel: string
  imageSize: number
}

export type CheckoutWalletOption = {
  id: string
  label: string
  isSelected: boolean
  badgeIconSrc?: string
}

export type CheckoutCollectorFormProps = {
  title: string
  leftColumnFields: FormFieldDisplayProps[]
  rightColumnFields: FormFieldDisplayProps[]
  ensPrefixLabel: string
  ensSelectArrowIconSrc: string
  alternateWalletLabel: string
  alternateWalletRadioIconSrc: string
  noteTitle: string
}

export type CheckoutOrderReviewProps = {
  title: string
  tableNftsLabel: string
  tableSubtotalLabel: string
  receiptItems: CheckoutReceiptItem[]
  promoHintLabel: string
  subtotalLabel: string
  subtotalValueLabel: string
  discountLabel: string
  discountValueLabel: string
  networkFeeLabel: string
  networkFeeValueLabel: string
  networkFeeHintLabel: string
  totalLabel: string
  totalValueLabel: string
  walletSectionTitle: string
  walletsChipLabel: string
  walletOptions: CheckoutWalletOption[]
  walletRadioIconSrc: string
  confirmLabel: string
  connectionStatusLabel?: string
  isConfirmDisabled?: boolean
  onConfirmClick?: () => void
  onWalletOptionClick?: (walletOptionId: string) => void
  onConnectWalletClick?: () => void
  onRefuseWalletClick?: () => void
  onDisconnectWalletClick?: () => void
}

export type CheckoutPaymentSectionProps = {
  breadcrumbLabel: string
  collectorFormProps: CheckoutCollectorFormProps
  orderReviewProps: CheckoutOrderReviewProps
}
