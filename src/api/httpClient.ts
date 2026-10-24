import axios from 'axios'

import { apiBaseUrl } from '@/api/apiConfig'
import { browserMocksReady } from '@/mocks/browserMocksReady'
import { guestCartIdStorageKey, sessionTokenStorageKey } from '@/consts/storageKeys'
import type { ApiErrorBody } from '@/types/api/errors'
import { notifySessionExpired } from '@/utils/sessionExpiredHandler'

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
})

httpClient.interceptors.request.use(async (requestConfig) => {
  await browserMocksReady

  const sessionToken = localStorage.getItem(sessionTokenStorageKey)
  const guestCartId = localStorage.getItem(guestCartIdStorageKey)

  if (sessionToken !== null) {
    requestConfig.headers.Authorization = `Bearer ${sessionToken}`
  }

  if (guestCartId !== null) {
    requestConfig.headers['X-Guest-Cart-Id'] = guestCartId
  }

  return requestConfig
})

httpClient.interceptors.response.use(
  (response) => {
    const guestCartIdHeader = response.headers['x-guest-cart-id']
    const headerValue = Array.isArray(guestCartIdHeader) ? guestCartIdHeader[0] : guestCartIdHeader
    const hasGuestCartId = headerValue !== undefined && headerValue.length > 0

    if (hasGuestCartId) {
      localStorage.setItem(guestCartIdStorageKey, headerValue)
    }

    return response
  },
  (error: unknown) => {
    const isAxiosError = axios.isAxiosError(error)

    if (isAxiosError) {
      const errorBody = error.response?.data as ApiErrorBody | undefined
      const isSessionExpired = errorBody?.error.code === 'SESSION_EXPIRED'
      const requestUrl = error.config?.url ?? ''
      const isLogoutRequest = requestUrl.includes('/auth/logout')

      if (isSessionExpired && !isLogoutRequest) {
        const isLoginRoute = window.location.pathname === '/login'
        const redirectPath = isLoginRoute
          ? null
          : `${window.location.pathname}${window.location.search}`
        notifySessionExpired(redirectPath)
      }
    }

    return Promise.reject(error)
  },
)
