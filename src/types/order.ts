import type { CheckoutReceiptItem } from '@/types/checkout'

export type OrderConfirmationMetaItem = {
  id: string
  label: string
  value: string
}

export type OrderConfirmationModalProps = {
  successTitle: string
  metaItems: OrderConfirmationMetaItem[]
  detailsTitle: string
  tableNftsLabel: string
  tableEditionsLabel: string
  tableSubtotalLabel: string
  receiptItems: CheckoutReceiptItem[]
  networkFeeLabel: string
  networkFeeValueLabel: string
  totalLabel: string
  totalValueLabel: string
  confirmationNote: string
  etherscanLabel: string
  closeAriaLabel: string
  closeIconSrc: string
  onEtherscanClick?: () => void
  onCloseClick?: () => void
}
