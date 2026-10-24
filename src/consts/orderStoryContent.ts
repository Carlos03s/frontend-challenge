import type { OrderConfirmationModalProps } from '@/types/order'

import { checkoutStoryReceiptItems } from '@/consts/checkoutStoryContent'

export const orderStoryConfirmationModalProps: OrderConfirmationModalProps = {
  successTitle: 'Seus NFTs agora estão na sua carteira',
  metaItems: [
    { id: 'tx-id', label: 'ID da transação', value: '0xA91F...E82C' },
    { id: 'date', label: 'Data', value: '29 Jul, 2026' },
    { id: 'total', label: 'Total', value: '26.846 ETH' },
    { id: 'wallet', label: 'Carteira', value: 'MetaMask' },
  ],
  detailsTitle: 'Detalhes da transação',
  tableNftsLabel: 'NFTs',
  tableEditionsLabel: 'Edições',
  tableSubtotalLabel: 'Subtotal',
  receiptItems: checkoutStoryReceiptItems,
  networkFeeLabel: 'Taxa de rede',
  networkFeeValueLabel: '0.016 ETH',
  totalLabel: 'Total',
  totalValueLabel: '26.846 ETH',
  confirmationNote:
    'Transação confirmada na Ethereum. A propriedade foi transferida para sua carteira conectada e registrada na rede.',
  etherscanLabel: 'Ver no Etherscan',
  closeAriaLabel: 'Fechar modal',
  closeIconSrc: '/assets/auth/figma/close.svg',
}
