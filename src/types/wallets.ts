import type { FormFieldDisplayProps } from '@/types/form'

export type WalletsManagementFormProps = {
  primaryWalletTitle: string
  addWalletLabel: string
  primaryWalletDescription: string
  fieldRows: FormFieldDisplayProps[][]
  saveWalletLabel: string
  secondaryWalletTitle: string
  secondaryWalletToggleLabel: string
  secondaryWalletAddLabel: string
  secondaryWalletEmptyLabel: string
  formErrorMessage?: string
  secondaryStatusLabel?: string
  secondaryFieldRows?: FormFieldDisplayProps[][]
  onSaveWalletClick?: () => void
  onAddSecondaryWalletClick?: () => void
  onSaveSecondaryWalletClick?: () => void
}
