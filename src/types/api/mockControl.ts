export type MockScenarioName =
  | 'default'
  | 'slow'
  | 'empty-catalog'
  | 'unstable'
  | 'payment-rejected'
  | 'payment-timeout'

export type MockScenarioInfo = {
  name: MockScenarioName
  description: string
}

export type MockControlStateResponse = {
  scenario: MockScenarioName
  scenarios: MockScenarioInfo[]
}

export type MockResetRequest = {
  scenario?: MockScenarioName
}

export type MockTriggerPriceChangeRequest = {
  nftId: string
  priceEth: string
}
