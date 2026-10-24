import type { MockScenarioInfo, MockScenarioName } from '@/types/api/mockControl'

export type MockScenarioBehavior = {
  latencyMs: number
  latencyJitterMs: number
  failRate: number
  orderOutcome: 'confirmed' | 'rejected' | 'timeout-recover'
  paymentDelayMs: number
  includeCatalog: boolean
}

export const mockScenarioCatalog: MockScenarioInfo[] = [
  { name: 'default', description: 'Fluxo padrão com latência baixa e pagamento confirmado.' },
  { name: 'slow', description: 'Latência alta para validar skeletons e estados de carregamento.' },
  { name: 'empty-catalog', description: 'Catálogo vazio para validar estado sem resultados.' },
  { name: 'unstable', description: 'Falhas transitórias intermitentes (HTTP 503).' },
  { name: 'payment-rejected', description: 'Pedidos recusados após confirmação simulada.' },
  { name: 'payment-timeout', description: 'Pedido pendente com recuperação por idempotência.' },
]

const scenarioBehaviorMap: Record<MockScenarioName, MockScenarioBehavior> = {
  default: {
    latencyMs: 120,
    latencyJitterMs: 80,
    failRate: 0,
    orderOutcome: 'confirmed',
    paymentDelayMs: 900,
    includeCatalog: true,
  },
  slow: {
    latencyMs: 1800,
    latencyJitterMs: 400,
    failRate: 0,
    orderOutcome: 'confirmed',
    paymentDelayMs: 2200,
    includeCatalog: true,
  },
  'empty-catalog': {
    latencyMs: 120,
    latencyJitterMs: 40,
    failRate: 0,
    orderOutcome: 'confirmed',
    paymentDelayMs: 900,
    includeCatalog: false,
  },
  unstable: {
    latencyMs: 250,
    latencyJitterMs: 120,
    failRate: 0.25,
    orderOutcome: 'confirmed',
    paymentDelayMs: 900,
    includeCatalog: true,
  },
  'payment-rejected': {
    latencyMs: 120,
    latencyJitterMs: 60,
    failRate: 0,
    orderOutcome: 'rejected',
    paymentDelayMs: 900,
    includeCatalog: true,
  },
  'payment-timeout': {
    latencyMs: 120,
    latencyJitterMs: 60,
    failRate: 0,
    orderOutcome: 'timeout-recover',
    paymentDelayMs: 12000,
    includeCatalog: true,
  },
}

export function getMockScenarioBehavior(scenario: MockScenarioName): MockScenarioBehavior {
  return scenarioBehaviorMap[scenario]
}

export function isMockScenarioName(value: string): value is MockScenarioName {
  return mockScenarioCatalog.some((scenarioInfo) => scenarioInfo.name === value)
}
