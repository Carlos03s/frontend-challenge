import { http } from 'msw'

import { apiBaseUrl } from '@/api/apiConfig'
import { getMockDatabaseState, resetMockDatabase } from '@/mocks/db/mockDatabase'
import {
  appendGuestCartIdHeader,
  createGuestCartIdIfMissing,
  readAuthorizationHeader,
  readGuestCartIdHeader,
  readIdempotencyKeyHeader,
  resolveMockUserFromRequest,
} from '@/mocks/handlers/mockRequestHelpers'
import {
  applyMockNetworkBehavior,
  armNextMockFailure,
  consumeForcedFailure,
} from '@/mocks/network/applyMockNetworkBehavior'
import { getMockSession, loginMockUser, logoutMockSession, registerMockUser } from '@/mocks/services/authService'
import {
  addMockCartItem,
  applyMockCartPromo,
  buildMockCartQuote,
  clearMockCartPromo,
  getMockCartDto,
  removeMockCartItem,
  updateMockCartItemQuantity,
} from '@/mocks/services/cartService'
import { addMockFavorite, listMockFavorites, removeMockFavorite } from '@/mocks/services/favoritesService'
import { emitStaleNftUpdatedEvent, replayLastNftUpdatedEvent } from '@/mocks/socket/emitMockRealtimeEvents'
import { getMockNftDetail, listMockNfts, updateMockNftPrice } from '@/mocks/services/nftCatalogService'
import { createMockOrder, getMockOrder } from '@/mocks/services/orderService'
import { changeMockPassword, getMockProfile, updateMockProfile } from '@/mocks/services/profileService'
import { isMockScenarioName, mockScenarioCatalog } from '@/mocks/scenarios/mockScenarioRegistry'
import { getMockWallets, upsertMockPrimaryWallet, upsertMockSecondaryWallet } from '@/mocks/services/walletsService'
import { validateWalletForm } from '@/utils/validateAccountForms'
import { mockErrorResponse, mockJsonResponse, mockMissingSessionResponse } from '@/mocks/utils/mockHttpResponses'
import type { AuthLoginRequest, AuthRegisterRequest } from '@/types/api/auth'
import type { CartAddItemRequest, CartApplyPromoRequest, CartUpdateItemRequest } from '@/types/api/cart'
import type { MockResetRequest, MockTriggerPriceChangeRequest } from '@/types/api/mockControl'
import type { CreateOrderRequest } from '@/types/api/orders'
import type { ChangePasswordRequest, UpdateProfileRequest } from '@/types/api/profile'
import type { UpsertWalletRequest } from '@/types/api/wallets'
function readJsonBody<T>(request: Request): Promise<T> {
  return request.json() as Promise<T>
}

function parseCommaSeparatedList(value: string | null): string[] | undefined {
  if (value === null || value.trim().length === 0) {
    return undefined
  }

  return value.split(',').map((entry) => entry.trim())
}

export const httpHandlers = [
  http.post(`${apiBaseUrl}/auth/register`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const payload = await readJsonBody<AuthRegisterRequest>(request)
    const result = await registerMockUser(payload)

    if (result === 'VALIDATION_ERROR') {
      return mockErrorResponse(400, 'VALIDATION_ERROR', 'Revise os dados do cadastro.', {
        email: ['Informe um e-mail válido.'],
        password: ['A senha precisa ter pelo menos 8 caracteres.'],
      })
    }

    if (result === 'CONFLICT') {
      return mockErrorResponse(409, 'CONFLICT', 'E-mail ou nome de usuário já cadastrado.')
    }

    return mockJsonResponse(result, 201)
  }),

  http.post(`${apiBaseUrl}/auth/login`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const payload = await readJsonBody<AuthLoginRequest>(request)
    const guestCartId = readGuestCartIdHeader(request)
    const result = await loginMockUser(payload, guestCartId)

    if (result === 'UNAUTHORIZED') {
      return mockErrorResponse(401, 'UNAUTHORIZED', 'Credenciais inválidas.')
    }

    return mockJsonResponse(result)
  }),

  http.get(`${apiBaseUrl}/auth/session`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const authorizationHeader = readAuthorizationHeader(request)
    const token = authorizationHeader?.replace('Bearer ', '') ?? ''
    const session = getMockSession(token)

    if (session === null) {
      return mockErrorResponse(401, 'SESSION_EXPIRED', 'Sessão expirada ou inválida.')
    }

    return mockJsonResponse(session)
  }),

  http.post(`${apiBaseUrl}/auth/logout`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const authorizationHeader = readAuthorizationHeader(request)
    const token = authorizationHeader?.replace('Bearer ', '') ?? ''
    logoutMockSession(token)

    return mockJsonResponse({ ok: true })
  }),

  http.get(`${apiBaseUrl}/nfts`, async ({ request }) => {
    const shouldFailOnce = consumeForcedFailure()

    if (shouldFailOnce) {
      return mockErrorResponse(503, 'TRANSIENT_ERROR', 'Serviço temporariamente indisponível. Tente novamente.')
    }

    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '9')
    const sortParam = url.searchParams.get('sort')
    const sort =
      sortParam === 'price-asc' || sortParam === 'price-desc' || sortParam === 'recent'
        ? sortParam
        : 'recent'
    const listingParam = url.searchParams.get('listing')
    const listing = listingParam === 'new' || listingParam === 'trending' ? listingParam : 'all'

    const response = listMockNfts({
      q: url.searchParams.get('q') ?? undefined,
      collectionIds: parseCommaSeparatedList(url.searchParams.get('collectionIds')),
      networkIds: parseCommaSeparatedList(url.searchParams.get('networkIds')),
      minPriceEth: url.searchParams.get('minPriceEth') ?? undefined,
      maxPriceEth: url.searchParams.get('maxPriceEth') ?? undefined,
      sort,
      listing,
      page,
      pageSize,
    })

    return mockJsonResponse(response)
  }),

  http.get(`${apiBaseUrl}/nfts/:nftId`, async ({ params, request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const favoriteNftIds = user?.favoriteNftIds ?? []
    const nftId = String(params.nftId)
    const nft = getMockNftDetail(nftId, favoriteNftIds)

    if (nft === null) {
      return mockErrorResponse(404, 'NOT_FOUND', 'NFT não encontrado.')
    }

    return mockJsonResponse(nft)
  }),

  http.get(`${apiBaseUrl}/favorites`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    return mockJsonResponse(listMockFavorites(user.id))
  }),

  http.post(`${apiBaseUrl}/favorites/:nftId`, async ({ params, request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const result = addMockFavorite(user.id, String(params.nftId))

    if (result === 'NOT_FOUND') {
      return mockErrorResponse(404, 'NOT_FOUND', 'NFT não encontrado.')
    }

    return mockJsonResponse(result)
  }),

  http.delete(`${apiBaseUrl}/favorites/:nftId`, async ({ params, request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    return mockJsonResponse(removeMockFavorite(user.id, String(params.nftId)))
  }),

  http.get(`${apiBaseUrl}/cart`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const guestCartId = createGuestCartIdIfMissing(readGuestCartIdHeader(request))
    const cart = getMockCartDto(user, guestCartId)
    const responseHeaders = new Headers()

    if (user === null) {
      appendGuestCartIdHeader(responseHeaders, guestCartId)
    }

    return mockJsonResponse(cart, 200, responseHeaders)
  }),

  http.post(`${apiBaseUrl}/cart/items`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const guestCartId = createGuestCartIdIfMissing(readGuestCartIdHeader(request))
    const payload = await readJsonBody<CartAddItemRequest>(request)
    const cart = addMockCartItem(user, guestCartId, payload)

    if (cart === null) {
      return mockErrorResponse(409, 'AVAILABILITY_CONFLICT', 'Edição indisponível para este NFT.')
    }

    const responseHeaders = new Headers()

    if (user === null) {
      appendGuestCartIdHeader(responseHeaders, guestCartId)
    }

    return mockJsonResponse(cart, 201, responseHeaders)
  }),

  http.patch(`${apiBaseUrl}/cart/items/:itemId`, async ({ params, request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const guestCartId = createGuestCartIdIfMissing(readGuestCartIdHeader(request))
    const payload = await readJsonBody<CartUpdateItemRequest>(request)
    const cart = updateMockCartItemQuantity(user, guestCartId, String(params.itemId), payload)

    if (cart === null) {
      return mockErrorResponse(404, 'NOT_FOUND', 'Item do carrinho não encontrado.')
    }

    return mockJsonResponse(cart)
  }),

  http.delete(`${apiBaseUrl}/cart/items/:itemId`, async ({ params, request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const guestCartId = createGuestCartIdIfMissing(readGuestCartIdHeader(request))
    const cart = removeMockCartItem(user, guestCartId, String(params.itemId))

    return mockJsonResponse(cart)
  }),

  http.post(`${apiBaseUrl}/cart/promo`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const guestCartId = createGuestCartIdIfMissing(readGuestCartIdHeader(request))
    const payload = await readJsonBody<CartApplyPromoRequest>(request)
    const result = applyMockCartPromo(user, guestCartId, payload)

    if (result.errorCode === 'PROMO_INVALID') {
      return mockErrorResponse(400, 'PROMO_INVALID', 'Código promocional inválido.')
    }

    if (result.errorCode === 'PROMO_EXPIRED') {
      return mockErrorResponse(400, 'PROMO_EXPIRED', 'Código promocional expirado.')
    }

    return mockJsonResponse(result.cart)
  }),

  http.delete(`${apiBaseUrl}/cart/promo`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const guestCartId = createGuestCartIdIfMissing(readGuestCartIdHeader(request))
    const cart = clearMockCartPromo(user, guestCartId)

    return mockJsonResponse(cart)
  }),

  http.post(`${apiBaseUrl}/cart/quote`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)
    const guestCartId = createGuestCartIdIfMissing(readGuestCartIdHeader(request))
    const quote = buildMockCartQuote(user, guestCartId)

    return mockJsonResponse(quote)
  }),

  http.post(`${apiBaseUrl}/orders`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const idempotencyKey = readIdempotencyKeyHeader(request)

    if (idempotencyKey === null) {
      return mockErrorResponse(400, 'VALIDATION_ERROR', 'Header Idempotency-Key é obrigatório.')
    }

    const payload = await readJsonBody<CreateOrderRequest>(request)
    const guestCartId = readGuestCartIdHeader(request)
    const result = createMockOrder(user.id, guestCartId, payload, idempotencyKey)

    if (result === 'QUOTE_STALE') {
      return mockErrorResponse(409, 'QUOTE_STALE', 'A cotação do carrinho está desatualizada.')
    }

    if (result === 'IDEMPOTENCY_CONFLICT') {
      return mockErrorResponse(409, 'IDEMPOTENCY_CONFLICT', 'Chave de idempotência reutilizada com payload diferente.')
    }

    if (result === 'UNAUTHORIZED') {
      return mockErrorResponse(401, 'UNAUTHORIZED', 'Carteira inválida para este usuário.')
    }

    return mockJsonResponse(result, 202)
  }),

  http.get(`${apiBaseUrl}/orders/:orderId`, async ({ params, request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const order = getMockOrder(String(params.orderId), user.id)

    if (order === null) {
      return mockErrorResponse(404, 'NOT_FOUND', 'Pedido não encontrado.')
    }

    return mockJsonResponse(order)
  }),

  http.get(`${apiBaseUrl}/profile`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const profile = getMockProfile(user.id)

    if (profile === null) {
      return mockErrorResponse(404, 'NOT_FOUND', 'Perfil não encontrado.')
    }

    return mockJsonResponse(profile)
  }),

  http.patch(`${apiBaseUrl}/profile`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const payload = await readJsonBody<UpdateProfileRequest>(request)
    const result = updateMockProfile(user.id, payload)

    if (result === 'VALIDATION_ERROR') {
      return mockErrorResponse(400, 'VALIDATION_ERROR', 'Revise os dados do perfil.', {
        displayName: ['Informe o nome de exibição.'],
        email: ['Informe um e-mail válido.'],
      })
    }

    if (result === 'CONFLICT') {
      return mockErrorResponse(409, 'CONFLICT', 'E-mail ou nome de usuário já está em uso.')
    }

    return mockJsonResponse(result)
  }),

  http.post(`${apiBaseUrl}/profile/password`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const payload = await readJsonBody<ChangePasswordRequest>(request)
    const result = await changeMockPassword(user.id, payload)

    if (result === 'VALIDATION_ERROR') {
      return mockErrorResponse(400, 'VALIDATION_ERROR', 'Confirmação de senha não confere.', {
        confirmPassword: ['As senhas não coincidem.'],
      })
    }

    if (result === 'UNAUTHORIZED') {
      return mockErrorResponse(401, 'UNAUTHORIZED', 'Senha atual inválida.')
    }

    return mockJsonResponse({ ok: true })
  }),

  http.get(`${apiBaseUrl}/wallets`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    return mockJsonResponse(getMockWallets(user.id))
  }),

  http.put(`${apiBaseUrl}/wallets/primary`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const payload = await readJsonBody<UpsertWalletRequest>(request)
    const walletFieldErrors = validateWalletForm({
      displayName: payload.displayName,
      address: payload.address,
      email: payload.email,
    })

    if (walletFieldErrors !== null) {
      return mockErrorResponse(400, 'VALIDATION_ERROR', 'Revise os dados da carteira.', walletFieldErrors)
    }

    return mockJsonResponse(upsertMockPrimaryWallet(user.id, payload))
  }),

  http.put(`${apiBaseUrl}/wallets/secondary`, async ({ request }) => {
    const transientError = await applyMockNetworkBehavior()

    if (transientError !== null) {
      return transientError
    }

    const user = resolveMockUserFromRequest(request)

    if (user === null) {
      return mockMissingSessionResponse(request)
    }

    const payload = await readJsonBody<UpsertWalletRequest>(request)
    const walletFieldErrors = validateWalletForm({
      displayName: payload.displayName,
      address: payload.address,
      email: payload.email,
    })

    if (walletFieldErrors !== null) {
      return mockErrorResponse(400, 'VALIDATION_ERROR', 'Revise os dados da carteira.', walletFieldErrors)
    }

    return mockJsonResponse(upsertMockSecondaryWallet(user.id, payload))
  }),

  http.get(`${apiBaseUrl}/mock/state`, async () => {
    const dbState = getMockDatabaseState()

    return mockJsonResponse({
      scenario: dbState.scenario,
      scenarios: mockScenarioCatalog,
    })
  }),

  http.post(`${apiBaseUrl}/mock/reset`, async ({ request }) => {
    const payload = await readJsonBody<MockResetRequest>(request)
    const scenarioName = payload.scenario ?? 'default'
    const isValidScenario = isMockScenarioName(scenarioName)

    if (!isValidScenario) {
      return mockErrorResponse(400, 'VALIDATION_ERROR', 'Cenário de mock inválido.')
    }

    const nextState = resetMockDatabase(scenarioName)

    return mockJsonResponse({ scenario: nextState.scenario, ok: true })
  }),

  http.post(`${apiBaseUrl}/mock/trigger/nft-price-change`, async ({ request }) => {
    const payload = await readJsonBody<MockTriggerPriceChangeRequest>(request)
    updateMockNftPrice(payload.nftId, payload.priceEth)

    return mockJsonResponse({ ok: true })
  }),

  http.post(`${apiBaseUrl}/mock/trigger/nft-event-replay`, async () => {
    const didReplay = replayLastNftUpdatedEvent()

    if (!didReplay) {
      return mockErrorResponse(404, 'NOT_FOUND', 'Nenhum evento de NFT para repetir.')
    }

    return mockJsonResponse({ ok: true })
  }),

  http.post(`${apiBaseUrl}/mock/fail-next`, async () => {
    armNextMockFailure()

    return mockJsonResponse({ ok: true })
  }),

  http.post(`${apiBaseUrl}/mock/trigger/nft-stale-event`, async ({ request }) => {
    const payload = await readJsonBody<{ nftId: string }>(request)
    emitStaleNftUpdatedEvent(payload.nftId)

    return mockJsonResponse({ ok: true })
  }),
]
