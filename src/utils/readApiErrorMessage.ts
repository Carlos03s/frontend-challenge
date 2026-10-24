import axios from 'axios'

import type { ApiErrorBody } from '@/types/api/errors'

export function readApiErrorMessage(error: unknown, fallbackMessage: string): string {
  const isAxiosError = axios.isAxiosError(error)

  if (!isAxiosError) {
    return fallbackMessage
  }

  const errorBody = error.response?.data as ApiErrorBody | undefined
  const fieldMessages = errorBody?.error.details
  const firstFieldMessage =
    fieldMessages === undefined ? undefined : Object.values(fieldMessages).flat()[0]

  if (firstFieldMessage !== undefined && firstFieldMessage.length > 0) {
    return firstFieldMessage
  }

  const apiMessage = errorBody?.error.message

  if (apiMessage !== undefined && apiMessage.length > 0) {
    return apiMessage
  }

  return fallbackMessage
}

export function readApiErrorCode(error: unknown): string | undefined {
  const isAxiosError = axios.isAxiosError(error)

  if (!isAxiosError) {
    return undefined
  }

  const errorBody = error.response?.data as ApiErrorBody | undefined

  return errorBody?.error.code
}
