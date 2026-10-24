export type AuthRegisterRequest = {
  username: string
  email: string
  password: string
}

export type AuthLoginRequest = {
  email: string
  password: string
}

export type AuthUserDto = {
  id: string
  username: string
  email: string
  displayName: string
}

export type AuthSessionDto = {
  token: string
  expiresAt: string
  user: AuthUserDto
}

export type AuthRegisterResponse = AuthSessionDto

export type AuthLoginResponse = AuthSessionDto
