import { getMockDatabaseState, updateMockDatabaseState } from '@/mocks/db/mockDatabase'
import type { ChangePasswordRequest, ProfileDto, UpdateProfileRequest } from '@/types/api/profile'
import { hashPassword } from '@/utils/hashPassword'
import { validateProfileForm } from '@/utils/validateAccountForms'

export function getMockProfile(userId: string): ProfileDto | null {
  const dbState = getMockDatabaseState()
  const user = dbState.users.find((userItem) => userItem.id === userId)

  if (user === undefined) {
    return null
  }

  return {
    displayName: user.displayName,
    username: user.username,
    email: user.email,
    ensName: user.ensName,
    walletAlias: user.walletAlias,
    avatarUrl: user.avatarUrl,
  }
}

export function updateMockProfile(
  userId: string,
  payload: UpdateProfileRequest,
): ProfileDto | 'CONFLICT' | 'VALIDATION_ERROR' {
  const fieldErrors = validateProfileForm({
    displayName: payload.displayName ?? '',
    username: payload.username ?? '',
    email: payload.email ?? '',
  })

  if (fieldErrors !== null) {
    return 'VALIDATION_ERROR'
  }

  const dbState = getMockDatabaseState()
  const emailConflict =
    payload.email !== undefined &&
    dbState.users.some((user) => user.id !== userId && user.email === payload.email)
  const usernameConflict =
    payload.username !== undefined &&
    dbState.users.some((user) => user.id !== userId && user.username === payload.username)

  if (emailConflict || usernameConflict) {
    return 'CONFLICT'
  }

  updateMockDatabaseState((state) => {
    const user = state.users.find((userItem) => userItem.id === userId)

    if (user === undefined) {
      return
    }

    if (payload.displayName !== undefined) {
      user.displayName = payload.displayName
    }

    if (payload.username !== undefined) {
      user.username = payload.username
    }

    if (payload.email !== undefined) {
      user.email = payload.email
    }

    if (payload.ensName !== undefined) {
      user.ensName = payload.ensName
    }

    if (payload.walletAlias !== undefined) {
      user.walletAlias = payload.walletAlias
    }

    if (payload.avatarUrl !== undefined) {
      user.avatarUrl = payload.avatarUrl
    }
  })

  const profile = getMockProfile(userId)

  if (profile === null) {
    throw new Error('Profile not found after update')
  }

  return profile
}

export async function changeMockPassword(
  userId: string,
  payload: ChangePasswordRequest,
): Promise<'OK' | 'VALIDATION_ERROR' | 'UNAUTHORIZED'> {
  const passwordsMatch = payload.newPassword === payload.confirmPassword

  if (!passwordsMatch) {
    return 'VALIDATION_ERROR'
  }

  const dbState = getMockDatabaseState()
  const user = dbState.users.find((userItem) => userItem.id === userId)

  if (user === undefined) {
    return 'UNAUTHORIZED'
  }

  const currentPasswordHash = await hashPassword(payload.currentPassword)
  const isCurrentPasswordValid = user.password === currentPasswordHash

  if (!isCurrentPasswordValid) {
    return 'UNAUTHORIZED'
  }

  const nextPasswordHash = await hashPassword(payload.newPassword)

  updateMockDatabaseState((state) => {
    const targetUser = state.users.find((userItem) => userItem.id === userId)

    if (targetUser === undefined) {
      return
    }

    targetUser.password = nextPasswordHash
  })

  return 'OK'
}
