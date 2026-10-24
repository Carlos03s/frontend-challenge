const minimumPasswordLength = 8

export type AccountFieldErrors = Record<string, string[]>

function isBlank(value: string): boolean {
  return value.trim().length === 0
}

function isEmailShapeValid(email: string): boolean {
  return email.includes('@') && email.includes('.')
}

export function validateSignUpForm(input: {
  username: string
  email: string
  password: string
  confirmPassword: string
}): AccountFieldErrors | null {
  const fieldErrors: AccountFieldErrors = {}

  if (isBlank(input.username)) {
    fieldErrors.username = ['Informe um nome de usuário.']
  }

  if (!isEmailShapeValid(input.email)) {
    fieldErrors.email = ['Informe um e-mail válido.']
  }

  if (input.password.length < minimumPasswordLength) {
    fieldErrors.password = ['A senha precisa ter pelo menos 8 caracteres.']
  }

  if (input.password !== input.confirmPassword) {
    fieldErrors.confirmPassword = ['As senhas não coincidem.']
  }

  const hasFieldErrors = Object.keys(fieldErrors).length > 0

  if (!hasFieldErrors) {
    return null
  }

  return fieldErrors
}

export function validateProfileForm(input: {
  displayName: string
  username: string
  email: string
}): AccountFieldErrors | null {
  const fieldErrors: AccountFieldErrors = {}

  if (isBlank(input.displayName)) {
    fieldErrors.displayName = ['Informe o nome de exibição.']
  }

  if (isBlank(input.username)) {
    fieldErrors.username = ['Informe o nome de usuário.']
  }

  if (!isEmailShapeValid(input.email)) {
    fieldErrors.email = ['Informe um e-mail válido.']
  }

  const hasFieldErrors = Object.keys(fieldErrors).length > 0

  if (!hasFieldErrors) {
    return null
  }

  return fieldErrors
}

export function validatePasswordChangeForm(input: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}): AccountFieldErrors | null {
  const hasPasswordInput =
    input.currentPassword.length > 0 ||
    input.newPassword.length > 0 ||
    input.confirmPassword.length > 0

  if (!hasPasswordInput) {
    return null
  }

  const fieldErrors: AccountFieldErrors = {}

  if (isBlank(input.currentPassword)) {
    fieldErrors.currentPassword = ['Informe a senha atual.']
  }

  if (input.newPassword.length < minimumPasswordLength) {
    fieldErrors.newPassword = ['A nova senha precisa ter pelo menos 8 caracteres.']
  }

  if (input.newPassword !== input.confirmPassword) {
    fieldErrors.confirmPassword = ['As senhas não coincidem.']
  }

  const hasFieldErrors = Object.keys(fieldErrors).length > 0

  if (!hasFieldErrors) {
    return null
  }

  return fieldErrors
}

export function validateWalletForm(input: {
  displayName: string
  address: string
  email: string
}): AccountFieldErrors | null {
  const fieldErrors: AccountFieldErrors = {}

  if (isBlank(input.displayName)) {
    fieldErrors.displayName = ['Informe o nome de exibição.']
  }

  const hasAddressPrefix = input.address.startsWith('0x')
  const hasAddressLength = input.address.trim().length >= 10

  if (!hasAddressPrefix || !hasAddressLength) {
    fieldErrors.address = ['Informe um endereço 0x válido.']
  }

  if (!isEmailShapeValid(input.email)) {
    fieldErrors.email = ['Informe um e-mail válido.']
  }

  const hasFieldErrors = Object.keys(fieldErrors).length > 0

  if (!hasFieldErrors) {
    return null
  }

  return fieldErrors
}

export function firstAccountFieldError(fieldErrors: AccountFieldErrors | null): string | undefined {
  if (fieldErrors === null) {
    return undefined
  }

  const firstMessage = Object.values(fieldErrors).flat()[0]

  return firstMessage
}
