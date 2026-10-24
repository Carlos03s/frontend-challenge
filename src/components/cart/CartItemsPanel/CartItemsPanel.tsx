import { CartItemRow } from '@/components/cart/CartItemRow/CartItemRow'
import { CartTableHeader } from '@/components/cart/CartTableHeader/CartTableHeader'
import type { CartItemsPanelProps } from '@/types/cart'

export function CartItemsPanel({ headerProps, itemRows }: CartItemsPanelProps) {
  const itemRowElements = itemRows.map((itemRow, itemRowIndex) => {
    const itemRowKey = `cart-item-${itemRowIndex}`

    return (
      <li key={itemRowKey}>
        <CartItemRow {...itemRow} />
      </li>
    )
  })

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-3">
      <CartTableHeader {...headerProps} />
      <div className="h-px w-full bg-border" />
      <ul className="flex flex-col gap-3">{itemRowElements}</ul>
    </section>
  )
}
