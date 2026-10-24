import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { AuthSignUpModal } from '@/components/auth/AuthSignUpModal/AuthSignUpModal'
import { MobileAuthForm } from '@/components/mobile/MobileAuthForm/MobileAuthForm'
import { registerAccount } from '@/api/authApi'
import { authStorySignUpModalProps } from '@/consts/authStoryContent'
import { queryKeys } from '@/consts/queryKeys'
import { clearPrivateSessionState } from '@/utils/clearPrivateSessionState'
import { readApiErrorMessage } from '@/utils/readApiErrorMessage'
import { firstAccountFieldError, validateSignUpForm } from '@/utils/validateAccountForms'
import { writeSessionToken } from '@/utils/sessionToken'

export function SignUpPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(undefined)

  const registerMutation = useMutation({
    mutationFn: registerAccount,
    onSuccess: async (session) => {
      clearPrivateSessionState(queryClient)
      writeSessionToken(session.token)
      queryClient.setQueryData(queryKeys.session, session)
      await queryClient.invalidateQueries({ queryKey: queryKeys.cart })
      void navigate({ to: '/perfil' })
    },
    onError: (error: unknown) => {
      setFormErrorMessage(readApiErrorMessage(error, 'Não foi possível criar a conta.'))
    },
  })

  const handleSubmitClick = () => {
    const fieldErrors = validateSignUpForm({ username, email, password, confirmPassword })
    const validationMessage = firstAccountFieldError(fieldErrors)

    if (validationMessage !== undefined) {
      setFormErrorMessage(validationMessage)
      return
    }

    setFormErrorMessage(undefined)
    registerMutation.mutate({
      username,
      email,
      password,
    })
  }

  const handleCloseClick = () => {
    void navigate({ to: '/' })
  }

  const handleFieldChange = (fieldId: string, value: string) => {
    if (fieldId === 'username') {
      setUsername(value)
      return
    }

    if (fieldId === 'email') {
      setEmail(value)
      return
    }

    if (fieldId === 'password') {
      setPassword(value)
      return
    }

    setConfirmPassword(value)
  }

  const mobileAuthElement = (
    <MobileAuthForm
      brandLabel="KURIO"
      dividerLabel="Ou continue com"
      fields={[
        {
          id: 'username',
          placeholder: 'Nome de usuário',
          value: username,
          type: 'text',
          autoComplete: 'username',
        },
        {
          id: 'email',
          placeholder: 'Digite seu e-mail',
          value: email,
          type: 'email',
          autoComplete: 'email',
        },
        {
          id: 'password',
          placeholder: 'Senha',
          value: password,
          type: 'password',
          autoComplete: 'new-password',
          toggleIconSrc: '/assets/auth/figma/hide.svg',
        },
        {
          id: 'confirmPassword',
          placeholder: 'Confirmar senha',
          value: confirmPassword,
          type: 'password',
          autoComplete: 'new-password',
          toggleIconSrc: '/assets/auth/figma/hide.svg',
        },
      ]}
      footerActionLabel="Entre"
      footerPrompt="Já tem uma conta?"
      footerTo="/login"
      errorMessage={formErrorMessage}
      isSubmitting={registerMutation.isPending}
      socialButtons={authStorySignUpModalProps.socialButtons}
      submitLabel="Criar perfil"
      title="Criar perfil de colecionador"
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmitClick}
    />
  )

  return (
    <>
      {mobileAuthElement}
      <div className="hidden justify-center px-4 py-16 lg:flex">
      <AuthSignUpModal
        {...authStorySignUpModalProps}
        confirmPassword={confirmPassword}
        email={email}
        errorMessage={formErrorMessage}
        isSubmitting={registerMutation.isPending}
        password={password}
        username={username}
        onCloseClick={handleCloseClick}
        onConfirmPasswordChange={setConfirmPassword}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmitClick={handleSubmitClick}
        onUsernameChange={setUsername}
      />
      </div>
    </>
  )
}
