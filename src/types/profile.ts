import type { FormFieldDisplayProps } from '@/types/form'

export type ProfilePasswordField = {
  id: string
  label: string
  placeholder: string
  value?: string
  onValueChange?: (value: string) => void
}

export type ProfileDetailsFormProps = {
  profileFields: FormFieldDisplayProps[]
  ensField: FormFieldDisplayProps
  ensPrefixLabel: string
  ensSelectArrowIconSrc: string
  walletAliasField: FormFieldDisplayProps
  avatarLabel: string
  avatarChangeLabel: string
  avatarRemoveLabel: string
  avatarIconSrc: string
  changePasswordTitle: string
  passwordFields: ProfilePasswordField[]
  saveLabel: string
  formErrorMessage?: string
  avatarImageSrc?: string | null
  onChangeAvatarClick?: () => void
  onRemoveAvatarClick?: () => void
  onSaveClick?: () => void
}
