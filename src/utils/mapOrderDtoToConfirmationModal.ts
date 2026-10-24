import type { OrderDto } from '@/types/api/orders'
import type { OrderConfirmationModalProps } from '@/types/order'
import { formatEthLabel } from '@/utils/formatEthLabel'

export function mapOrderDtoToConfirmationModalProps(order: OrderDto): OrderConfirmationModalProps {
  const receiptItems = order.items.map((item) => ({
    id: item.nftId,
    name: item.nftName,
    tokenIdLabel: item.tokenIdLabel,
    imageSrc: item.imageSrc,
    imageAlt: item.imageAlt,
    quantityLabel: `(x ${item.quantity})`,
    subtotalLabel: formatEthLabel(item.lineTotalEth),
    imageSize: 62,
  }))

  return {
    successTitle: 'Seus NFTs agora estão na sua carteira',
    metaItems: [
      { id: 'tx-id', label: 'ID da transação', value: order.transactionHash ?? '—' },
      { id: 'date', label: 'Data', value: new Date(order.updatedAt).toLocaleDateString('pt-BR') },
      { id: 'total', label: 'Total', value: formatEthLabel(order.totalEth) },
      { id: 'wallet', label: 'Carteira', value: order.walletLabel },
    ],
    detailsTitle: 'Detalhes da transação',
    tableNftsLabel: 'NFTs',
    tableEditionsLabel: 'Edições',
    tableSubtotalLabel: 'Subtotal',
    receiptItems,
    networkFeeLabel: 'Taxa de rede',
    networkFeeValueLabel: formatEthLabel(order.networkFeeEth),
    totalLabel: 'Total',
    totalValueLabel: formatEthLabel(order.totalEth),
    confirmationNote:
      order.confirmationNote ??
      'Transação confirmada na Ethereum. A propriedade foi transferida para sua carteira conectada e registrada na rede.',
    etherscanLabel: 'Ver no Etherscan',
    closeAriaLabel: 'Fechar modal',
    closeIconSrc: '/assets/auth/figma/close.svg',
  }
}
