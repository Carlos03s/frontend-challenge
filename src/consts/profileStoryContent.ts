import type { ProfileDetailsFormProps } from '@/types/profile'
import type { FormFieldDisplayProps } from '@/types/form'

const profileSelectArrowIconSrc = '/assets/checkout/figma/arrow-down.svg'

const profileStoryProfileFields: FormFieldDisplayProps[] = [
  { label: 'Nome de exibição', isRequired: true, valueLabel: '' },
  { label: 'Nome de usuário', isRequired: true, valueLabel: '' },
  { label: 'E-mail', isRequired: true, valueLabel: '' },
]

export const profileStoryDetailsFormProps: ProfileDetailsFormProps = {
  profileFields: profileStoryProfileFields,
  ensField: { label: 'Nome ENS', isRequired: true, valueLabel: '' },
  ensPrefixLabel: '.eth',
  ensSelectArrowIconSrc: profileSelectArrowIconSrc,
  walletAliasField: { label: 'Apelido da carteira', isRequired: true, valueLabel: '' },
  avatarLabel: 'Avatar',
  avatarChangeLabel: 'Alterar',
  avatarRemoveLabel: 'Remover',
  avatarIconSrc: '/assets/home/figma/login.svg',
  changePasswordTitle: 'Alterar senha',
  passwordFields: [
    { id: 'current-password', label: 'Senha atual', placeholder: '***********' },
    { id: 'new-password', label: 'Nova senha', placeholder: '***********' },
    { id: 'confirm-password', label: 'Confirmar nova senha', placeholder: '***********' },
  ],
  saveLabel: 'Salvar',
}
