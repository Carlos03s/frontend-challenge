import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { PageContent } from '@/components/layout/PageContent/PageContent'
import { AccountPageLayout } from '@/components/account/AccountPageLayout/AccountPageLayout'
import { ProfileDetailsForm } from '@/components/profile/ProfileDetailsForm/ProfileDetailsForm'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import { changeProfilePassword, fetchProfile, updateProfile } from '@/api/profileApi'

const profileAvatarAssetSrc = '/assets/home/figma/ape-golden.webp'
import { useAccountSidebarWithLogout } from '@/hooks/useAccountSidebarWithLogout'
import { queryKeys } from '@/consts/queryKeys'
import type { ProfileDetailsFormProps } from '@/types/profile'
import { readApiErrorMessage } from '@/utils/readApiErrorMessage'
import {
  firstAccountFieldError,
  validatePasswordChangeForm,
  validateProfileForm,
} from '@/utils/validateAccountForms'

export function ProfilePage() {
  const queryClient = useQueryClient()
  const sidebarProps = useAccountSidebarWithLogout('profile')
  const profileQuery = useQuery({
    queryKey: queryKeys.profile,
    queryFn: fetchProfile,
  })
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [ensName, setEnsName] = useState('')
  const [walletAlias, setWalletAlias] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(undefined)

  const profile = profileQuery.data
  const [syncedProfile, setSyncedProfile] = useState(profile)
  const hasLoadedProfile = profile !== undefined
  const hasProfileChanged = profile !== syncedProfile

  if (hasLoadedProfile && hasProfileChanged) {
    setSyncedProfile(profile)
    setDisplayName(profile.displayName)
    setUsername(profile.username)
    setEmail(profile.email)
    setEnsName(profile.ensName)
    setWalletAlias(profile.walletAlias)
    setAvatarUrl(profile.avatarUrl)
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      await updateProfile({
        displayName,
        username,
        email,
        ensName,
        walletAlias,
      })

      const hasPasswordChange =
        currentPassword.length > 0 || newPassword.length > 0 || confirmPassword.length > 0

      if (!hasPasswordChange) {
        return
      }

      await changeProfilePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      })
    },
    onSuccess: async () => {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setFormErrorMessage(undefined)
      await queryClient.invalidateQueries({ queryKey: queryKeys.profile })
      await queryClient.invalidateQueries({ queryKey: queryKeys.session })
    },
    onError: (error: unknown) => {
      setFormErrorMessage(readApiErrorMessage(error, 'Não foi possível salvar o perfil.'))
    },
  })

  const avatarMutation = useMutation({
    mutationFn: (nextAvatarUrl: string | null) =>
      updateProfile({
        displayName,
        username,
        email,
        ensName,
        walletAlias,
        avatarUrl: nextAvatarUrl,
      }),
    onSuccess: async (profile) => {
      setAvatarUrl(profile.avatarUrl)
      setFormErrorMessage(undefined)
      await queryClient.invalidateQueries({ queryKey: queryKeys.profile })
    },
    onError: (error: unknown) => {
      setFormErrorMessage(readApiErrorMessage(error, 'Não foi possível atualizar o avatar.'))
    },
  })

  const handleChangeAvatarClick = () => {
    avatarMutation.mutate(profileAvatarAssetSrc)
  }

  const handleRemoveAvatarClick = () => {
    avatarMutation.mutate(null)
  }

  const handleSaveClick = () => {
    const profileErrors = validateProfileForm({ displayName, username, email })
    const passwordErrors = validatePasswordChangeForm({
      currentPassword,
      newPassword,
      confirmPassword,
    })
    const profileErrorMessage = firstAccountFieldError(profileErrors)
    const passwordErrorMessage = firstAccountFieldError(passwordErrors)
    const nextErrorMessage = profileErrorMessage ?? passwordErrorMessage

    if (nextErrorMessage !== undefined) {
      setFormErrorMessage(nextErrorMessage)
      return
    }

    setFormErrorMessage(undefined)
    saveMutation.mutate()
  }

  if (profileQuery.isPending || profileQuery.data === undefined) {
    return <p className="font-mono text-base text-secondary">Carregando perfil...</p>
  }

  const profileFormProps: ProfileDetailsFormProps = {
    profileFields: [
      {
        label: 'Nome de exibição',
        isRequired: true,
        valueLabel: displayName,
        onValueChange: setDisplayName,
      },
      {
        label: 'Nome de usuário',
        isRequired: true,
        valueLabel: username,
        onValueChange: setUsername,
      },
      {
        label: 'E-mail',
        isRequired: true,
        valueLabel: email,
        onValueChange: setEmail,
      },
    ],
    ensField: {
      label: 'Nome ENS',
      isRequired: true,
      valueLabel: ensName,
      onValueChange: setEnsName,
    },
    ensPrefixLabel: '.eth',
    ensSelectArrowIconSrc: '/assets/checkout/figma/arrow-down.svg',
    walletAliasField: {
      label: 'Apelido da carteira',
      isRequired: true,
      valueLabel: walletAlias,
      onValueChange: setWalletAlias,
    },
    avatarLabel: 'Avatar',
    avatarChangeLabel: 'Alterar',
    avatarRemoveLabel: 'Remover',
    avatarIconSrc: '/assets/home/figma/login.svg',
    changePasswordTitle: 'Alterar senha',
    passwordFields: [
      {
        id: 'current-password',
        label: 'Senha atual',
        placeholder: 'Senha atual',
        value: currentPassword,
        onValueChange: setCurrentPassword,
      },
      {
        id: 'new-password',
        label: 'Nova senha',
        placeholder: 'Nova senha',
        value: newPassword,
        onValueChange: setNewPassword,
      },
      {
        id: 'confirm-password',
        label: 'Confirmar nova senha',
        placeholder: 'Confirmar nova senha',
        value: confirmPassword,
        onValueChange: setConfirmPassword,
      },
    ],
    saveLabel: 'Salvar',
    formErrorMessage,
    avatarImageSrc: avatarUrl,
    onChangeAvatarClick: handleChangeAvatarClick,
    onRemoveAvatarClick: handleRemoveAvatarClick,
    onSaveClick: handleSaveClick,
  }

  const profileFormElement = <ProfileDetailsForm {...profileFormProps} />

  const layoutElement = (
    <AccountPageLayout contentElement={profileFormElement} sidebarProps={sidebarProps} />
  )

  const breadcrumbElement = <PageBreadcrumb label="Início / Meu perfil / Dados do perfil" />

  return (
    <PageContent className="gap-8">
      {breadcrumbElement}
      {layoutElement}
    </PageContent>
  )
}
