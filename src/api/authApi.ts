import { httpClient } from '@/api/httpClient'
import type { AuthLoginRequest, AuthRegisterRequest, AuthSessionDto } from '@/types/api/auth'

export async function registerAccount(payload: AuthRegisterRequest): Promise<AuthSessionDto> {
  const response = await httpClient.post<AuthSessionDto>('/auth/register', payload)
  return response.data
}

export async function loginAccount(payload: AuthLoginRequest): Promise<AuthSessionDto> {
  const response = await httpClient.post<AuthSessionDto>('/auth/login', payload)
  return response.data
}

export async function fetchSession(): Promise<AuthSessionDto> {
  const response = await httpClient.get<AuthSessionDto>('/auth/session')
  return response.data
}

export async function logoutAccount(): Promise<void> {
  await httpClient.post('/auth/logout')
}
