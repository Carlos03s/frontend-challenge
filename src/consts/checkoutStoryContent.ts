import type {
  CheckoutCollectorFormProps,
  CheckoutOrderReviewProps,
  CheckoutPaymentSectionProps,
  CheckoutReceiptItem,
} from '@/types/checkout'
import type { FormFieldDisplayProps } from '@/types/form'

const checkoutSelectArrowIconSrc = '/assets/checkout/figma/arrow-down.svg'
const checkoutRadioIconSrc = '/assets/checkout/figma/radio.svg'

const apeGreenImageSrc = '/assets/home/figma/ape-green.webp'
const apePurpleImageSrc = '/assets/home/figma/ape-purple.webp'
const apeBlackImageSrc = '/assets/home/figma/ape-black.webp'

export const checkoutStoryReceiptItems: CheckoutReceiptItem[] = [
  {
    id: 'receipt-emerald',
    name: 'Emerald Ape #042',
    tokenIdLabel: 'ID do token: #0042',
    imageSrc: apeGreenImageSrc,
    imageAlt: 'Emerald Ape #042',
    quantityLabel: '(x 2)',
    subtotalLabel: '2.38 ETH',
    imageSize: 62,
  },
  {
    id: 'receipt-violet',
    name: 'Violet Nomad #314',
    tokenIdLabel: 'ID do token: #0314',
    imageSrc: apePurpleImageSrc,
    imageAlt: 'Violet Nomad #314',
    quantityLabel: '(x 6)',
    subtotalLabel: '8.34 ETH',
    imageSize: 62,
  },
  {
    id: 'receipt-ivory',
    name: 'Ivory Baron #088',
    tokenIdLabel: 'ID do token: #0088',
    imageSrc: apeBlackImageSrc,
    imageAlt: 'Ivory Baron #088',
    quantityLabel: '(x 9)',
    subtotalLabel: '16.11 ETH',
    imageSize: 62,
  },
]

const checkoutStoryLeftColumnFields: FormFieldDisplayProps[] = [
  { label: 'Nome de exibição', isRequired: true, valueLabel: '' },
  {
    label: 'Rede',
    isRequired: true,
    valueLabel: 'Selecione uma rede',
    selectArrowIconSrc: checkoutSelectArrowIconSrc,
  },
  { label: 'Endereço da carteira', isRequired: true, valueLabel: 'Endereço 0x da carteira' },
  {
    label: 'Tipo de carteira',
    isRequired: true,
    valueLabel: 'Selecione uma carteira',
    selectArrowIconSrc: checkoutSelectArrowIconSrc,
  },
  { label: 'E-mail', isRequired: true, valueLabel: '' },
]

const checkoutStoryRightColumnFields: FormFieldDisplayProps[] = [
  { label: 'Nome de usuário', isRequired: true, valueLabel: '' },
  { label: 'Nome do perfil', isRequired: true, valueLabel: '' },
  {
    label: 'ENS ou carteira secundária (opcional)',
    isRequired: false,
    valueLabel: '',
  },
  { label: 'Código de indicação', isRequired: false, valueLabel: '' },
]

export const checkoutStoryCollectorFormProps: CheckoutCollectorFormProps = {
  title: 'Perfil do colecionador',
  leftColumnFields: checkoutStoryLeftColumnFields,
  rightColumnFields: checkoutStoryRightColumnFields,
  ensPrefixLabel: '.eth',
  ensSelectArrowIconSrc: checkoutSelectArrowIconSrc,
  alternateWalletLabel: 'Usar outra carteira?',
  alternateWalletRadioIconSrc: checkoutRadioIconSrc,
  noteTitle: 'Observação do colecionador (opcional)',
}

export const checkoutStoryOrderReviewProps: CheckoutOrderReviewProps = {
  title: 'Seus NFTs',
  tableNftsLabel: 'NFTs',
  tableSubtotalLabel: 'Subtotal',
  receiptItems: checkoutStoryReceiptItems,
  promoHintLabel: 'Tem um código promocional? Aplique aqui',
  subtotalLabel: 'Subtotal',
  subtotalValueLabel: '26.83 ETH',
  discountLabel: 'Desconto do lançamento',
  discountValueLabel: '(-) 00.00',
  networkFeeLabel: 'Taxa de rede',
  networkFeeValueLabel: '0.016 ETH',
  networkFeeHintLabel: 'Taxa estimada',
  totalLabel: 'Total',
  totalValueLabel: '26.846 ETH',
  walletSectionTitle: 'Carteiras compatíveis',
  walletsChipLabel: 'METAMASK  •  WALLETCONNECT  •  COINBASE',
  walletOptions: [
    {
      id: 'wallet-metamask',
      label: 'METAMASK',
      isSelected: false,
      badgeIconSrc: checkoutRadioIconSrc,
    },
    {
      id: 'wallet-connect',
      label: 'WALLETCONNECT',
      isSelected: false,
      badgeIconSrc: checkoutRadioIconSrc,
    },
    {
      id: 'wallet-coinbase',
      label: 'Coinbase Wallet',
      isSelected: true,
    },
  ],
  walletRadioIconSrc: checkoutRadioIconSrc,
  confirmLabel: 'Confirmar compra',
}

export const checkoutStoryPaymentSectionProps: CheckoutPaymentSectionProps = {
  breadcrumbLabel: 'Início / Mercado / Pagamento',
  collectorFormProps: checkoutStoryCollectorFormProps,
  orderReviewProps: checkoutStoryOrderReviewProps,
}
