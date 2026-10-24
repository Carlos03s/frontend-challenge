import type { MockDbPromo } from '@/mocks/db/mockDbTypes'

export const mockFixturePromos: MockDbPromo[] = [
  {
    code: 'LAUNCH2026',
    label: 'Desconto do lançamento',
    discountEth: '0.50',
    isExpired: false,
  },
  {
    code: 'EXPIRED2025',
    label: 'Campanha encerrada',
    discountEth: '1.00',
    isExpired: true,
  },
]
