import { CheckoutCollectorForm } from '@/components/checkout/CheckoutCollectorForm/CheckoutCollectorForm'
import { CheckoutOrderReview } from '@/components/checkout/CheckoutOrderReview/CheckoutOrderReview'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import type { CheckoutPaymentSectionProps } from '@/types/checkout'

export function CheckoutPaymentSection({
  breadcrumbLabel,
  collectorFormProps,
  orderReviewProps,
}: CheckoutPaymentSectionProps) {
  return (
    <section className="flex w-full flex-col gap-8">
      <PageBreadcrumb label={breadcrumbLabel} />
      <div className="flex flex-col gap-8 lg:flex-row">
        <CheckoutCollectorForm {...collectorFormProps} />
        <CheckoutOrderReview {...orderReviewProps} />
      </div>
    </section>
  )
}
