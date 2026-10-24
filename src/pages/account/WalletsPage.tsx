import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { PageContent } from '@/components/layout/PageContent/PageContent'
import { AccountPageLayout } from '@/components/account/AccountPageLayout/AccountPageLayout'
import { WalletsManagementForm } from '@/components/wallets/WalletsManagementForm/WalletsManagementForm'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import { fetchWallets, upsertPrimaryWallet, upsertSecondaryWallet } from '@/api/walletsApi'
import { useAccountSidebarWithLogout } from '@/hooks/useAccountSidebarWithLogout'
import { walletsStoryManagementFormProps } from '@/consts/walletsStoryContent'
import { queryKeys } from '@/consts/queryKeys'
import type { FormFieldDisplayProps } from '@/types/form'
import { readApiErrorMessage } from '@/utils/readApiErrorMessage'
import { firstAccountFieldError, validateWalletForm } from '@/utils/validateAccountForms'

const defaultWalletAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'

export function WalletsPage() {
  const queryClient = useQueryClient()
  const sidebarProps = useAccountSidebarWithLogout('wallets')
  const walletsQuery = useQuery({
    queryKey: queryKeys.wallets,
    queryFn: fetchWallets,
  })
  const [displayName, setDisplayName] = useState('')
  const [walletAlias, setWalletAlias] = useState('')
  const [address, setAddress] = useState(defaultWalletAddress)
  const [email, setEmail] = useState('')
  const [secondaryDisplayName, setSecondaryDisplayName] = useState('')
  const [secondaryAddress, setSecondaryAddress] = useState('')
  const [secondaryEmail, setSecondaryEmail] = useState('')
  const [isSecondaryEditorOpen, setIsSecondaryEditorOpen] = useState(false)
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(undefined)

  const wallets = walletsQuery.data
  const [syncedWallets, setSyncedWallets] = useState(wallets)
  const hasLoadedWallets = wallets !== undefined
  const haveWalletsChanged = wallets !== syncedWallets

  if (hasLoadedWallets && haveWalletsChanged) {
    setSyncedWallets(wallets)

    const primaryWallet = wallets.primary
    const hasPrimaryWallet = primaryWallet !== null && primaryWallet !== undefined

    if (hasPrimaryWallet) {
      setDisplayName(primaryWallet.displayName)
      setWalletAlias(primaryWallet.walletAlias)
      setAddress(primaryWallet.address)
      setEmail(primaryWallet.email)
    }

    const secondaryWallet = wallets.secondary
    const hasSecondaryWallet = secondaryWallet !== null && secondaryWallet !== undefined

    if (hasSecondaryWallet) {
      setSecondaryDisplayName(secondaryWallet.displayName)
      setSecondaryAddress(secondaryWallet.address)
      setSecondaryEmail(secondaryWallet.email)
    }
  }

  const saveMutation = useMutation({
    mutationFn: () => {
      const primaryWallet = walletsQuery.data?.primary

      return upsertPrimaryWallet({
        displayName,
        walletAlias,
        networkId: primaryWallet?.networkId ?? 'ethereum',
        profileName: primaryWallet?.profileName ?? displayName,
        address,
        ensOrSecondary: primaryWallet?.ensOrSecondary,
        walletType: primaryWallet?.walletType ?? 'MetaMask',
        referralCode: primaryWallet?.referralCode,
        email,
        ensName: primaryWallet?.ensName ?? '',
      })
    },
    onSuccess: async () => {
      setFormErrorMessage(undefined)
      await queryClient.invalidateQueries({ queryKey: queryKeys.wallets })
    },
    onError: (error: unknown) => {
      setFormErrorMessage(readApiErrorMessage(error, 'Não foi possível salvar a carteira.'))
    },
  })

  const saveSecondaryMutation = useMutation({
    mutationFn: () =>
      upsertSecondaryWallet({
        displayName: secondaryDisplayName,
        walletAlias: secondaryDisplayName,
        networkId: 'polygon',
        profileName: secondaryDisplayName,
        address: secondaryAddress,
        walletType: 'WalletConnect',
        email: secondaryEmail,
        ensName: '',
      }),
    onSuccess: async () => {
      setFormErrorMessage(undefined)
      setIsSecondaryEditorOpen(false)
      await queryClient.invalidateQueries({ queryKey: queryKeys.wallets })
    },
    onError: (error: unknown) => {
      setFormErrorMessage(readApiErrorMessage(error, 'Não foi possível salvar a carteira secundária.'))
    },
  })

  const handleSaveWalletClick = () => {
    const fieldErrors = validateWalletForm({ displayName, address, email })
    const validationMessage = firstAccountFieldError(fieldErrors)

    if (validationMessage !== undefined) {
      setFormErrorMessage(validationMessage)
      return
    }

    setFormErrorMessage(undefined)
    saveMutation.mutate()
  }

  const handleAddSecondaryWalletClick = () => {
    setIsSecondaryEditorOpen(true)
  }

  const handleSaveSecondaryWalletClick = () => {
    const fieldErrors = validateWalletForm({
      displayName: secondaryDisplayName,
      address: secondaryAddress,
      email: secondaryEmail,
    })
    const validationMessage = firstAccountFieldError(fieldErrors)

    if (validationMessage !== undefined) {
      setFormErrorMessage(validationMessage)
      return
    }

    setFormErrorMessage(undefined)
    saveSecondaryMutation.mutate()
  }

  const secondaryWallet = walletsQuery.data?.secondary ?? null
  const hasSecondaryWallet = secondaryWallet !== null
  let secondaryStatusLabel = walletsStoryManagementFormProps.secondaryWalletEmptyLabel

  if (hasSecondaryWallet) {
    secondaryStatusLabel = `${secondaryWallet.displayName} · ${secondaryWallet.address}`
  }

  const secondaryFieldRows = isSecondaryEditorOpen
    ? [
        [
          {
            label: 'Nome de exibição',
            isRequired: true,
            valueLabel: secondaryDisplayName,
            onValueChange: setSecondaryDisplayName,
          },
          {
            label: 'Endereço da carteira',
            isRequired: true,
            valueLabel: secondaryAddress,
            onValueChange: setSecondaryAddress,
          },
        ],
        [
          {
            label: 'E-mail',
            isRequired: true,
            valueLabel: secondaryEmail,
            onValueChange: setSecondaryEmail,
          },
        ],
      ]
    : []

  const fieldRows = walletsStoryManagementFormProps.fieldRows.map((rowFields) =>
    rowFields.map((field): FormFieldDisplayProps => {
      if (field.label === 'Nome de exibição') {
        return { ...field, valueLabel: displayName, onValueChange: setDisplayName }
      }

      if (field.label === 'Apelido da carteira') {
        return { ...field, valueLabel: walletAlias, onValueChange: setWalletAlias }
      }

      if (field.label === 'Endereço da carteira') {
        return { ...field, valueLabel: address, onValueChange: setAddress }
      }

      if (field.label === 'E-mail') {
        return { ...field, valueLabel: email, onValueChange: setEmail }
      }

      return field
    }),
  )

  const walletsFormElement = (
    <WalletsManagementForm
      {...walletsStoryManagementFormProps}
      fieldRows={fieldRows}
      formErrorMessage={formErrorMessage}
      secondaryFieldRows={secondaryFieldRows}
      secondaryStatusLabel={secondaryStatusLabel}
      onAddSecondaryWalletClick={handleAddSecondaryWalletClick}
      onSaveSecondaryWalletClick={handleSaveSecondaryWalletClick}
      onSaveWalletClick={handleSaveWalletClick}
    />
  )

  const layoutElement = (
    <AccountPageLayout contentElement={walletsFormElement} sidebarProps={sidebarProps} />
  )

  const breadcrumbElement = <PageBreadcrumb label="Início / Meu perfil / Carteiras" />

  if (walletsQuery.isPending) {
    return <p className="font-mono text-base text-secondary">Carregando carteiras...</p>
  }

  return (
    <PageContent className="gap-8">
      {breadcrumbElement}
      {layoutElement}
    </PageContent>
  )
}
