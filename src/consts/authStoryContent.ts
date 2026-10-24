import type { AuthSignInModalProps, AuthSignUpModalProps, AuthSocialButtonProps } from '@/types/auth'

export const authStorySocialButtons: AuthSocialButtonProps[] = [
  {
    label: 'Continuar com Google',
    iconSrc: '/assets/auth/figma/google.svg',
  },
  {
    label: 'Continuar com Facebook',
    iconSrc: '/assets/auth/figma/facebook.svg',
  },
]

const noopStringHandler = () => {}

export const authStorySignUpModalProps: AuthSignUpModalProps = {
  signInTabLabel: 'Entrar',
  signUpTabLabel: 'Criar conta',
  description: 'Crie seu perfil de colecionador e conecte uma carteira quando quiser.',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  usernamePlaceholder: 'Nome de usuário',
  emailPlaceholder: 'Digite seu e-mail',
  passwordPlaceholder: 'Senha',
  confirmPasswordPlaceholder: 'Confirmar senha',
  submitLabel: 'Criar conta',
  dividerLabel: 'Ou continue com',
  socialButtons: authStorySocialButtons,
  closeAriaLabel: 'Fechar modal',
  closeIconSrc: '/assets/auth/figma/close.svg',
  passwordToggleIconSrc: '/assets/auth/figma/hide.svg',
  onUsernameChange: noopStringHandler,
  onEmailChange: noopStringHandler,
  onPasswordChange: noopStringHandler,
  onConfirmPasswordChange: noopStringHandler,
}

export const authStorySignInModalProps: AuthSignInModalProps = {
  signInTabLabel: 'Entrar',
  signUpTabLabel: 'Criar conta',
  description: 'Entre para gerenciar sua carteira, coleção e perfil de criador.',
  email: 'contato@email.com',
  password: '',
  emailPlaceholder: 'contato@email.com',
  passwordPlaceholder: '***********',
  forgotPasswordLabel: 'Esqueceu a senha?',
  submitLabel: 'Entrar',
  dividerLabel: 'Ou continue com',
  socialButtons: authStorySocialButtons,
  closeAriaLabel: 'Fechar modal',
  closeIconSrc: '/assets/auth/figma/close.svg',
  passwordToggleAriaLabel: 'Mostrar ou ocultar senha',
  passwordToggleIconSrc: '/assets/auth/figma/hide.svg',
  isPasswordVisible: false,
  onEmailChange: noopStringHandler,
  onPasswordChange: noopStringHandler,
}
