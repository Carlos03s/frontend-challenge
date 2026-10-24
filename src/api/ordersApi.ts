import { httpClient } from '@/api/httpClient'
import type { CreateOrderRequest, OrderDto } from '@/types/api/orders'

export async function createOrder(payload: CreateOrderRequest, idempotencyKey: string): Promise<OrderDto> {
  const response = await httpClient.post<OrderDto>('/orders', payload, {
    headers: {
      'Idempotency-Key': idempotencyKey,
    },
  })
  return response.data
}

export async function fetchOrder(orderId: string): Promise<OrderDto> {
  const response = await httpClient.get<OrderDto>(`/orders/${orderId}`)
  return response.data
}
