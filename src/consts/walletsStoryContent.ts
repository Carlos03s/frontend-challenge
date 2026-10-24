import type { WalletsManagementFormProps } from '@/types/wallets'
import type { FormFieldDisplayProps } from '@/types/form'

const walletsSelectArrowIconSrc = '/assets/checkout/figma/arrow-down.svg'

const walletsStoryFieldRowOne: FormFieldDisplayProps[] = [
  { label: 'Nome de exibição', isRequired: true, valueLabel: '' },
  { label: 'Apelido da carteira', isRequired: true, valueLabel: '' },
]

const walletsStoryFieldRowTwo: FormFieldDisplayProps[] = [
  {
    label: 'Rede',
    isRequired: true,
    valueLabel: 'Selecione uma rede',
    selectArrowIconSrc: walletsSelectArrowIconSrc,
  },
  { label: 'Nome do perfil', isRequired: true, valueLabel: '' },
]

const walletsStoryFieldRowThree: FormFieldDisplayProps[] = [
  { label: 'Endereço da carteira', isRequired: true, valueLabel: 'Endereço 0x da carteira' },
  { label: 'ENS ou carteira secundária (opcional)', isRequired: false, valueLabel: '' },
]

const walletsStoryFieldRowFour: FormFieldDisplayProps[] = [
  {
    label: 'Tipo de carteira',
    isRequired: true,
    valueLabel: 'Selecione uma carteira',
    selectArrowIconSrc: walletsSelectArrowIconSrc,
  },
  { label: 'Código de indicação', isRequired: false, valueLabel: '' },
]

const walletsStoryFieldRowFive: FormFieldDisplayProps[] = [
  { label: 'E-mail', isRequired: true, valueLabel: '' },
  { label: 'Nome ENS', isRequired: true, valueLabel: '' },
]

export const walletsStoryManagementFormProps: WalletsManagementFormProps = {
  primaryWalletTitle: 'Carteira principal',
  addWalletLabel: 'Adicionar',
  primaryWalletDescription:
    'Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.',
  fieldRows: [
    walletsStoryFieldRowOne,
    walletsStoryFieldRowTwo,
    walletsStoryFieldRowThree,
    walletsStoryFieldRowFour,
    walletsStoryFieldRowFive,
  ],
  saveWalletLabel: 'Salvar carteira',
  secondaryWalletTitle: 'Carteira secundária',
  secondaryWalletToggleLabel: 'Igual à carteira principal',
  secondaryWalletAddLabel: 'Adicionar',
  secondaryWalletEmptyLabel: 'Você ainda não adicionou uma carteira secundária.',
}
