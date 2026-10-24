import type { CartTableHeaderProps } from '@/types/cart'

export function CartTableHeader({
  nftsColumnLabel,
  priceColumnLabel,
  editionsColumnLabel,
  totalColumnLabel,
}: CartTableHeaderProps) {
  return (
    <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_4.5rem_6.5rem_5.5rem_1.5rem] items-center font-mono text-base font-bold leading-4 text-foreground">
      <p className="min-w-0">{nftsColumnLabel}</p>
      <p className="text-center">{priceColumnLabel}</p>
      <p className="text-center">{editionsColumnLabel}</p>
      <p className="text-center">{totalColumnLabel}</p>
      <span aria-hidden />
    </div>
  )
}
