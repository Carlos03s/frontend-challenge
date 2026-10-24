import { CheckoutPaymentSection } from '@/components/checkout/CheckoutPaymentSection/CheckoutPaymentSection'
import { checkoutStoryPaymentSectionProps } from '@/consts/checkoutStoryContent'

export function CheckoutDesktopReference() {
  return <CheckoutPaymentSection {...checkoutStoryPaymentSectionProps} />
}
