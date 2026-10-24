import { useQuery } from '@tanstack/react-query'

import { fetchCart } from '@/api/cartApi'
import { queryKeys } from '@/consts/queryKeys'

export function useCartQuery() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: fetchCart,
  })
}
