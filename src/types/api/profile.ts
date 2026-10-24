export type ProfileDto = {
  displayName: string
  username: string
  email: string
  ensName: string
  walletAlias: string
  avatarUrl: string | null
}

export type UpdateProfileRequest = {
  displayName?: string
  username?: string
  email?: string
  ensName?: string
  walletAlias?: string
  avatarUrl?: string | null
}

export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
