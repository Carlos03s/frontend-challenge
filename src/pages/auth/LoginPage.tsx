import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { AuthSignInModal } from '@/components/auth/AuthSignInModal/AuthSignInModal'
import { MobileAuthForm } from '@/components/mobile/MobileAuthForm/MobileAuthForm'
import { loginAccount } from '@/api/authApi'
import { authStorySignInModalProps } from '@/consts/authStoryContent'
import { queryKeys } from '@/consts/queryKeys'
import { clearPrivateSessionState } from '@/utils/clearPrivateSessionState'
import { readApiErrorMessage } from '@/utils/readApiErrorMessage'
import { writeSessionToken } from '@/utils/sessionToken'

type LoginSearch = {
  redirect?: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const search = useSearch({ strict: false }) as LoginSearch
  const [email, setEmail] = useState('collector@kurio.test')
  const [password, setPassword] = useState('Password123!')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const loginMutation = useMutation({
    mutationFn: loginAccount,
    onSuccess: async (session) => {
      clearPrivateSessionState(queryClient)
      writeSessionToken(session.token)
      queryClient.setQueryData(queryKeys.session, session)
      await queryClient.invalidateQueries({ queryKey: queryKeys.cart })

      const redirectPath = search.redirect ?? '/'

      void navigate({ to: redirectPath })
    },
  })

  const handleSubmitClick = () => {
    loginMutation.mutate({ email, password })
  }

  const handleCloseClick = () => {
    void navigate({ to: '/' })
  }

  const handlePasswordToggleClick = () => {
    setIsPasswordVisible((previous) => !previous)
  }

  const errorMessage = loginMutation.isError
    ? readApiErrorMessage(loginMutation.error, 'Não foi possível entrar.')
    : undefined

  const handleFieldChange = (fieldId: string, value: string) => {
    if (fieldId === 'email') {
      setEmail(value)
      return
    }

    setPassword(value)
  }

  const mobileAuthElement = (
    <MobileAuthForm
      brandLabel="KURIO"
      dividerLabel="Ou continue com"
      fields={[
        {
          id: 'email',
          placeholder: 'contato@email.com',
          value: email,
          type: 'email',
          autoComplete: 'email',
        },
        {
          id: 'password',
          placeholder: '***********',
          value: password,
          type: isPasswordVisible ? 'text' : 'password',
          autoComplete: 'current-password',
          toggleIconSrc: '/assets/auth/figma/hide.svg',
        },
      ]}
      footerActionLabel="Crie uma conta"
      footerPrompt="Novo na Kurio?"
      footerTo="/cadastro"
      errorMessage={errorMessage}
      forgotPasswordLabel="Esqueceu a senha?"
      isSubmitting={loginMutation.isPending}
      socialButtons={authStorySignInModalProps.socialButtons}
      submitLabel="Entrar"
      title="Entrar"
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmitClick}
    />
  )

  return (
    <>
      {mobileAuthElement}
      <div className="hidden justify-center px-4 py-16 lg:flex">
      <AuthSignInModal
        {...authStorySignInModalProps}
        email={email}
        errorMessage={errorMessage}
        isPasswordVisible={isPasswordVisible}
        isSubmitting={loginMutation.isPending}
        password={password}
        onCloseClick={handleCloseClick}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onPasswordToggleClick={handlePasswordToggleClick}
        onSubmitClick={handleSubmitClick}
      />
      </div>
    </>
  )
}
