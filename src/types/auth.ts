export type AuthSocialButtonProps = {
  label: string
  iconSrc: string
  onClick?: () => void
}

export type AuthSignUpModalProps = {
  signInTabLabel: string
  signUpTabLabel: string
  description: string
  username: string
  email: string
  password: string
  confirmPassword: string
  usernamePlaceholder: string
  emailPlaceholder: string
  passwordPlaceholder: string
  confirmPasswordPlaceholder: string
  submitLabel: string
  dividerLabel: string
  socialButtons: AuthSocialButtonProps[]
  closeAriaLabel: string
  closeIconSrc: string
  passwordToggleIconSrc: string
  isSubmitting?: boolean
  errorMessage?: string
  onUsernameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSignInTabClick?: () => void
  onSubmitClick?: () => void
  onCloseClick?: () => void
}

export type AuthSignInModalProps = {
  signInTabLabel: string
  signUpTabLabel: string
  description: string
  email: string
  password: string
  emailPlaceholder: string
  passwordPlaceholder: string
  forgotPasswordLabel: string
  submitLabel: string
  dividerLabel: string
  socialButtons: AuthSocialButtonProps[]
  closeAriaLabel: string
  closeIconSrc: string
  passwordToggleAriaLabel: string
  passwordToggleIconSrc: string
  isPasswordVisible: boolean
  isSubmitting?: boolean
  errorMessage?: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSignUpTabClick?: () => void
  onSubmitClick?: () => void
  onCloseClick?: () => void
  onPasswordToggleClick?: () => void
}
