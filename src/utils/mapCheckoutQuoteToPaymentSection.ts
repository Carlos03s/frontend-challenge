import type { CartQuoteResponse } from '@/types/api/cart'
import type { WalletDto } from '@/types/api/wallets'
import type { CheckoutPaymentSectionProps, CheckoutReceiptItem } from '@/types/checkout'
import { formatEthLabel } from '@/utils/formatEthLabel'

const checkoutRadioIconSrc = '/assets/checkout/figma/radio.svg'
const checkoutSelectArrowIconSrc = '/assets/checkout/figma/arrow-down.svg'

function mapReceiptItems(cartQuote: CartQuoteResponse): CheckoutReceiptItem[] {
  return cartQuote.cart.items.map((item) => ({
    id: item.id,
    name: item.nftName,
    tokenIdLabel: item.tokenIdLabel,
    imageSrc: item.imageSrc,
    imageAlt: item.imageAlt,
    quantityLabel: `(x ${item.quantity})`,
    subtotalLabel: formatEthLabel(item.lineTotalEth),
    imageSize: 62,
  }))
}

export function mapCheckoutQuoteToPaymentSectionProps(
  cartQuote: CartQuoteResponse,
  wallets: WalletDto[],
  selectedWalletId: string,
  handlers: {
    onConfirmClick?: () => void
    onWalletOptionClick?: (walletOptionId: string) => void
    connectionStatusLabel?: string
    isConfirmDisabled?: boolean
    onConnectWalletClick?: () => void
    onRefuseWalletClick?: () => void
    onDisconnectWalletClick?: () => void
  },
): CheckoutPaymentSectionProps {
  const walletOptions = wallets.map((wallet) => ({
    id: wallet.id,
    label: wallet.walletType,
    isSelected: wallet.id === selectedWalletId,
    badgeIconSrc: wallet.walletType.includes('METAMASK') ? checkoutRadioIconSrc : undefined,
  }))

  const primaryWallet = wallets[0]
  const profileFieldsLeft = [
    { label: 'Nome de exibição', isRequired: true, valueLabel: primaryWallet?.displayName ?? '' },
    {
      label: 'Rede',
      isRequired: true,
      valueLabel: primaryWallet?.networkId ?? 'Selecione uma rede',
      selectArrowIconSrc: checkoutSelectArrowIconSrc,
    },
    {
      label: 'Endereço da carteira',
      isRequired: true,
      valueLabel: primaryWallet?.address ?? 'Endereço 0x da carteira',
    },
    {
      label: 'Tipo de carteira',
      isRequired: true,
      valueLabel: primaryWallet?.walletType ?? 'Selecione uma carteira',
      selectArrowIconSrc: checkoutSelectArrowIconSrc,
    },
    { label: 'E-mail', isRequired: true, valueLabel: primaryWallet?.email ?? '' },
  ]

  const profileFieldsRight = [
    { label: 'Nome de usuário', isRequired: true, valueLabel: primaryWallet?.profileName ?? '' },
    { label: 'Nome do perfil', isRequired: true, valueLabel: primaryWallet?.profileName ?? '' },
    { label: 'ENS ou carteira secundária (opcional)', isRequired: false, valueLabel: primaryWallet?.ensOrSecondary ?? '' },
    { label: 'Código de indicação', isRequired: false, valueLabel: primaryWallet?.referralCode ?? '' },
  ]

  const discountValueLabel = cartQuote.cart.promo
    ? `(-) ${cartQuote.cart.discountEth}`
    : '(-) 00.00'

  return {
    breadcrumbLabel: 'Início / Mercado / Pagamento',
    collectorFormProps: {
      title: 'Perfil do colecionador',
      leftColumnFields: profileFieldsLeft,
      rightColumnFields: profileFieldsRight,
      ensPrefixLabel: '.eth',
      ensSelectArrowIconSrc: checkoutSelectArrowIconSrc,
      alternateWalletLabel: 'Usar outra carteira?',
      alternateWalletRadioIconSrc: checkoutRadioIconSrc,
      noteTitle: 'Observação do colecionador (opcional)',
    },
    orderReviewProps: {
      title: 'Seus NFTs',
      tableNftsLabel: 'NFTs',
      tableSubtotalLabel: 'Subtotal',
      receiptItems: mapReceiptItems(cartQuote),
      promoHintLabel: 'Tem um código promocional? Aplique aqui',
      subtotalLabel: 'Subtotal',
      subtotalValueLabel: formatEthLabel(cartQuote.cart.subtotalEth),
      discountLabel: cartQuote.cart.promo?.label ?? 'Desconto do lançamento',
      discountValueLabel,
      networkFeeLabel: 'Taxa de rede',
      networkFeeValueLabel: formatEthLabel(cartQuote.cart.networkFeeEth),
      networkFeeHintLabel: 'Taxa estimada',
      totalLabel: 'Total',
      totalValueLabel: formatEthLabel(cartQuote.cart.totalEth),
      walletSectionTitle: 'Carteiras compatíveis',
      walletsChipLabel: 'METAMASK  •  WALLETCONNECT  •  COINBASE',
      walletOptions,
      walletRadioIconSrc: checkoutRadioIconSrc,
      confirmLabel: 'Confirmar compra',
      onConfirmClick: handlers.onConfirmClick,
      onWalletOptionClick: handlers.onWalletOptionClick,
      connectionStatusLabel: handlers.connectionStatusLabel,
      isConfirmDisabled: handlers.isConfirmDisabled,
      onConnectWalletClick: handlers.onConnectWalletClick,
      onRefuseWalletClick: handlers.onRefuseWalletClick,
      onDisconnectWalletClick: handlers.onDisconnectWalletClick,
    },
  }
}
