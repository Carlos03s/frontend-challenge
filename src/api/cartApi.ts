import { httpClient } from '@/api/httpClient'
import type {
  CartAddItemRequest,
  CartApplyPromoRequest,
  CartDto,
  CartQuoteResponse,
  CartUpdateItemRequest,
} from '@/types/api/cart'

export async function fetchCart(): Promise<CartDto> {
  const response = await httpClient.get<CartDto>('/cart')
  return response.data
}

export async function addCartItem(payload: CartAddItemRequest): Promise<CartDto> {
  const response = await httpClient.post<CartDto>('/cart/items', payload)
  return response.data
}

export async function updateCartItem(cartItemId: string, payload: CartUpdateItemRequest): Promise<CartDto> {
  const response = await httpClient.patch<CartDto>(`/cart/items/${cartItemId}`, payload)
  return response.data
}

export async function removeCartItem(cartItemId: string): Promise<CartDto> {
  const response = await httpClient.delete<CartDto>(`/cart/items/${cartItemId}`)
  return response.data
}

export async function applyCartPromo(payload: CartApplyPromoRequest): Promise<CartDto> {
  const response = await httpClient.post<CartDto>('/cart/promo', payload)
  return response.data
}

export async function clearCartPromo(): Promise<CartDto> {
  const response = await httpClient.delete<CartDto>('/cart/promo')
  return response.data
}

export async function fetchCartQuote(): Promise<CartQuoteResponse> {
  const response = await httpClient.post<CartQuoteResponse>('/cart/quote')
  return response.data
}
