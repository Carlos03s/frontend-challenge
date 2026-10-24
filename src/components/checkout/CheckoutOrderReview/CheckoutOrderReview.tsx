import { CheckoutReceiptItemRow } from '@/components/checkout/CheckoutReceiptItemRow/CheckoutReceiptItemRow'
import { Button } from '@/components/ui/button'
import { mergeClassNames } from '@/utils/mergeClassNames'
import type { CheckoutOrderReviewProps, CheckoutWalletOption } from '@/types/checkout'

type CheckoutWalletOptionRowProps = {
  option: CheckoutWalletOption
  radioIconSrc: string
  onWalletOptionClick?: (walletOptionId: string) => void
}

function CheckoutWalletOptionRow({ option, radioIconSrc, onWalletOptionClick }: CheckoutWalletOptionRowProps) {
  const handleClick = () => {
    if (onWalletOptionClick !== undefined) {
      onWalletOptionClick(option.id)
    }
  }
  const optionClassName = mergeClassNames(
    'flex h-[45px] w-full items-center gap-2.5 rounded-sm border px-3',
    option.isSelected ? 'border-primary' : 'border-border',
  )

  const badgeElement = option.badgeIconSrc ? (
    <span className="flex h-[26px] flex-1 items-center justify-center rounded-md border border-border-soft bg-surface-dark px-2 font-mono text-[9px] font-bold tracking-[0.1px] text-text-accent">
      {option.label}
    </span>
  ) : (
    <p className="font-mono text-[15px] text-foreground">{option.label}</p>
  )

  return (
    <button className={optionClassName} type="button" onClick={handleClick}>
      <img alt="" className="size-4" src={radioIconSrc} />
      {badgeElement}
    </button>
  )
}

export function CheckoutOrderReview({
  title,
  tableNftsLabel,
  tableSubtotalLabel,
  receiptItems,
  promoHintLabel,
  subtotalLabel,
  subtotalValueLabel,
  discountLabel,
  discountValueLabel,
  networkFeeLabel,
  networkFeeValueLabel,
  networkFeeHintLabel,
  totalLabel,
  totalValueLabel,
  walletSectionTitle,
  walletsChipLabel,
  walletOptions,
  walletRadioIconSrc,
  confirmLabel,
  connectionStatusLabel,
  isConfirmDisabled,
  onConfirmClick,
  onWalletOptionClick,
  onConnectWalletClick,
  onRefuseWalletClick,
  onDisconnectWalletClick,
}: CheckoutOrderReviewProps) {
  const receiptRows = receiptItems.map((item) => (
    <li key={item.id}>
      <CheckoutReceiptItemRow item={item} />
    </li>
  ))

  const hasConnectionStatus = connectionStatusLabel !== undefined && connectionStatusLabel.length > 0
  const connectionStatusElement = hasConnectionStatus ? (
    <p className="text-center font-mono text-sm text-text-accent" role="status">
      {connectionStatusLabel}
    </p>
  ) : null
  const walletActionClassName =
    'cursor-pointer font-mono text-sm text-text-accent underline-offset-2 hover:underline'

  const walletOptionRows = walletOptions.map((option) => (
    <li key={option.id}>
      <CheckoutWalletOptionRow
        onWalletOptionClick={onWalletOptionClick}
        option={option}
        radioIconSrc={walletRadioIconSrc}
      />
    </li>
  ))

  return (
    <aside className="flex w-full min-w-0 flex-col gap-3 lg:w-[min(405px,38%)] lg:shrink-0">
      <h2 className="font-mono text-[17px] font-bold leading-4 text-foreground">{title}</h2>
      <div className="flex items-center justify-between font-mono text-base leading-4 text-foreground">
        <p className="font-bold">{tableNftsLabel}</p>
        <p className="font-medium">{tableSubtotalLabel}</p>
      </div>
      <div className="h-px w-full bg-border" />
      <ul className="flex flex-col gap-3">{receiptRows}</ul>
      <p className="text-center font-mono text-sm text-foreground">{promoHintLabel}</p>
      <div className="flex flex-col gap-3 font-mono text-[15px] text-foreground">
        <div className="flex justify-between">
          <span>{subtotalLabel}</span>
          <span className="text-lg leading-4">{subtotalValueLabel}</span>
        </div>
        <div className="flex justify-between">
          <span>{discountLabel}</span>
          <span>{discountValueLabel}</span>
        </div>
        <div className="flex justify-between">
          <span>{networkFeeLabel}</span>
          <span className="text-lg leading-4">{networkFeeValueLabel}</span>
        </div>
        <p className="text-center text-xs leading-4 text-text-accent">{networkFeeHintLabel}</p>
        <div className="h-px w-full bg-border" />
        <div className="flex justify-between font-bold leading-4">
          <span className="text-base">{totalLabel}</span>
          <span className="text-lg text-text-accent">{totalValueLabel}</span>
        </div>
      </div>
      <h3 className="text-center font-mono text-[17px] font-bold leading-4 text-foreground">
        {walletSectionTitle}
      </h3>
      <ul className="flex flex-col gap-4">{walletOptionRows}</ul>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button className={walletActionClassName} type="button" onClick={onConnectWalletClick}>
          Conectar
        </Button>
        <Button className={walletActionClassName} type="button" onClick={onRefuseWalletClick}>
          Recusar
        </Button>
        <Button className={walletActionClassName} type="button" onClick={onDisconnectWalletClick}>
          Desconectar
        </Button>
      </div>
      {connectionStatusElement}
      <p className="text-center font-mono text-[9px] font-bold tracking-[0.1px] text-text-accent">
        {walletsChipLabel}
      </p>
      <Button
        className="flex h-[45px] w-full cursor-pointer items-center justify-center rounded-lg bg-primary font-mono text-[15px] font-bold leading-4 text-ink disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isConfirmDisabled}
        type="button"
        onClick={onConfirmClick}
      >
        {confirmLabel}
      </Button>
    </aside>
  )
}
