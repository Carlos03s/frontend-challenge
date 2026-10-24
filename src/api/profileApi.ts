import { httpClient } from '@/api/httpClient'
import type { ChangePasswordRequest, ProfileDto, UpdateProfileRequest } from '@/types/api/profile'

export async function fetchProfile(): Promise<ProfileDto> {
  const response = await httpClient.get<ProfileDto>('/profile')
  return response.data
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<ProfileDto> {
  const response = await httpClient.patch<ProfileDto>('/profile', payload)
  return response.data
}

export async function changeProfilePassword(payload: ChangePasswordRequest): Promise<void> {
  await httpClient.post('/profile/password', payload)
}
