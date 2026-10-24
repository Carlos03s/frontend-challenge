import type { MockDbCart, MockDbCartItem, MockDbNft, MockDbUser } from '@/mocks/db/mockDbTypes'
import { getMockDatabaseState, updateMockDatabaseState } from '@/mocks/db/mockDatabase'
import type {
  CartAddItemRequest,
  CartApplyPromoRequest,
  CartDto,
  CartQuoteLineIssue,
  CartQuoteResponse,
  CartUpdateItemRequest,
} from '@/types/api/cart'
import { addEth, compareEth, multiplyEth, subtractEth } from '@/utils/ethDecimal'

const networkFeeEth = '0.016'

function createCartItemId(): string {
  return `cart-item-${crypto.randomUUID()}`
}

function createCartId(): string {
  return `cart-${crypto.randomUUID()}`
}

function findEditionLabel(nft: MockDbNft, editionKey: string): string {
  const edition = nft.editions.find((editionItem) => editionItem.key === editionKey)

  if (edition === undefined) {
    return editionKey
  }

  return edition.label
}

function getEditionMaxQuantity(nft: MockDbNft, editionKey: string): number {
  const edition = nft.editions.find((editionItem) => editionItem.key === editionKey)

  if (edition === undefined) {
    return 0
  }

  return edition.available
}

export function resolveCartForContext(user: MockDbUser | null, guestCartId: string | null): MockDbCart {
  const dbState = getMockDatabaseState()

  if (user !== null) {
    const userCart = dbState.carts.find((cart) => cart.ownerUserId === user.id)

    if (userCart !== undefined) {
      return userCart
    }

    const createdCart: MockDbCart = {
      id: createCartId(),
      ownerUserId: user.id,
      guestId: null,
      items: [],
      promoCode: null,
      quoteVersion: 1,
    }

    updateMockDatabaseState((state) => {
      state.carts.push(createdCart)
    })

    return createdCart
  }

  const hasGuestCartId = guestCartId !== null && guestCartId.length > 0

  if (hasGuestCartId) {
    const guestCart = dbState.carts.find((cart) => cart.guestId === guestCartId)

    if (guestCart !== undefined) {
      return guestCart
    }
  }

  const createdGuestCart: MockDbCart = {
    id: createCartId(),
    ownerUserId: null,
    guestId: guestCartId ?? createCartId(),
    items: [],
    promoCode: null,
    quoteVersion: 1,
  }

  updateMockDatabaseState((state) => {
    state.carts.push(createdGuestCart)
  })

  return createdGuestCart
}

function mapCartItemToDto(cartItem: MockDbCartItem, nft: MockDbNft): CartDto['items'][number] {
  const lineTotalEth = multiplyEth(cartItem.unitPriceEth, cartItem.quantity)
  const editionLabel = findEditionLabel(nft, cartItem.editionKey)
  const maxQuantity = getEditionMaxQuantity(nft, cartItem.editionKey)

  return {
    id: cartItem.id,
    nftId: nft.id,
    nftName: nft.name,
    tokenIdLabel: `ID do token: #${nft.tokenId}`,
    editionKey: cartItem.editionKey,
    editionLabel,
    imageSrc: nft.imageSrc,
    imageAlt: nft.imageAlt,
    unitPriceEth: cartItem.unitPriceEth,
    quantity: cartItem.quantity,
    lineTotalEth,
    nftVersion: cartItem.nftVersion,
    maxQuantity,
  }
}

function calculateCartTotals(cart: MockDbCart): Pick<CartDto, 'subtotalEth' | 'discountEth' | 'networkFeeEth' | 'totalEth' | 'promo'> {
  const dbState = getMockDatabaseState()
  let subtotalEth = '0'

  cart.items.forEach((cartItem) => {
    const lineTotalEth = multiplyEth(cartItem.unitPriceEth, cartItem.quantity)
    subtotalEth = addEth(subtotalEth, lineTotalEth)
  })

  const promo = dbState.promos.find((promoItem) => promoItem.code === cart.promoCode) ?? null
  const hasPromo = promo !== null && !promo.isExpired
  const discountEth = hasPromo ? promo.discountEth : '0.00'
  const isDiscountAboveSubtotal = compareEth(discountEth, subtotalEth) === 1
  const appliedDiscountEth = isDiscountAboveSubtotal ? subtotalEth : discountEth
  const subtotalAfterDiscount = subtractEth(subtotalEth, appliedDiscountEth)
  const totalEth = addEth(subtotalAfterDiscount, networkFeeEth)

  const promoDto = hasPromo
    ? {
        code: promo.code,
        discountEth: promo.discountEth,
        label: promo.label,
      }
    : null

  return {
    subtotalEth,
    discountEth,
    networkFeeEth,
    totalEth,
    promo: promoDto,
  }
}

export function mapMockCartToDto(cart: MockDbCart): CartDto {
  const dbState = getMockDatabaseState()
  const itemDtos = cart.items.flatMap((cartItem) => {
    const nft = dbState.nfts.find((nftItem) => nftItem.id === cartItem.nftId)

    if (nft === undefined) {
      return []
    }

    return [mapCartItemToDto(cartItem, nft)]
  })

  const totals = calculateCartTotals(cart)

  return {
    id: cart.id,
    items: itemDtos,
    promo: totals.promo,
    subtotalEth: totals.subtotalEth,
    discountEth: totals.discountEth,
    networkFeeEth: totals.networkFeeEth,
    totalEth: totals.totalEth,
    quoteVersion: cart.quoteVersion,
  }
}

export function getMockCartDto(user: MockDbUser | null, guestCartId: string | null): CartDto {
  const cart = resolveCartForContext(user, guestCartId)

  return mapMockCartToDto(cart)
}

export function addMockCartItem(
  user: MockDbUser | null,
  guestCartId: string | null,
  payload: CartAddItemRequest,
): CartDto | null {
  const dbState = getMockDatabaseState()
  const nft = dbState.nfts.find((nftItem) => nftItem.id === payload.nftId) ?? null
  const hasNft = nft !== null

  if (!hasNft) {
    return null
  }

  const maxQuantity = getEditionMaxQuantity(nft, payload.editionKey)
  const isEditionAvailable = maxQuantity > 0

  if (!isEditionAvailable) {
    return null
  }

  const cart = resolveCartForContext(user, guestCartId)
  const existingItem = cart.items.find(
    (item) => item.nftId === payload.nftId && item.editionKey === payload.editionKey,
  )

  updateMockDatabaseState((state) => {
    const targetCart = state.carts.find((cartItem) => cartItem.id === cart.id)

    if (targetCart === undefined) {
      return
    }

    targetCart.quoteVersion += 1

    if (existingItem !== undefined) {
      const targetItem = targetCart.items.find((item) => item.id === existingItem.id)

      if (targetItem !== undefined) {
        targetItem.quantity += payload.quantity
        targetItem.unitPriceEth = nft.priceEth
        targetItem.nftVersion = nft.version
      }

      return
    }

    const newItem: MockDbCartItem = {
      id: createCartItemId(),
      nftId: payload.nftId,
      editionKey: payload.editionKey,
      quantity: payload.quantity,
      unitPriceEth: nft.priceEth,
      nftVersion: nft.version,
    }

    targetCart.items.push(newItem)
  })

  return getMockCartDto(user, guestCartId)
}

export function updateMockCartItemQuantity(
  user: MockDbUser | null,
  guestCartId: string | null,
  cartItemId: string,
  payload: CartUpdateItemRequest,
): CartDto | null {
  const cart = resolveCartForContext(user, guestCartId)

  updateMockDatabaseState((state) => {
    const targetCart = state.carts.find((cartItem) => cartItem.id === cart.id)

    if (targetCart === undefined) {
      return
    }

    const targetItem = targetCart.items.find((item) => item.id === cartItemId)

    if (targetItem === undefined) {
      return
    }

    targetCart.quoteVersion += 1
    targetItem.quantity = payload.quantity
  })

  return getMockCartDto(user, guestCartId)
}

export function removeMockCartItem(
  user: MockDbUser | null,
  guestCartId: string | null,
  cartItemId: string,
): CartDto {
  const cart = resolveCartForContext(user, guestCartId)

  updateMockDatabaseState((state) => {
    const targetCart = state.carts.find((cartItem) => cartItem.id === cart.id)

    if (targetCart === undefined) {
      return
    }

    targetCart.quoteVersion += 1
    targetCart.items = targetCart.items.filter((item) => item.id !== cartItemId)
  })

  return getMockCartDto(user, guestCartId)
}

export function applyMockCartPromo(
  user: MockDbUser | null,
  guestCartId: string | null,
  payload: CartApplyPromoRequest,
): { cart: CartDto; errorCode: 'PROMO_INVALID' | 'PROMO_EXPIRED' | null } {
  const dbState = getMockDatabaseState()
  const promo = dbState.promos.find((promoItem) => promoItem.code === payload.code) ?? null
  const cart = resolveCartForContext(user, guestCartId)

  if (promo === null) {
    return { cart: mapMockCartToDto(cart), errorCode: 'PROMO_INVALID' }
  }

  if (promo.isExpired) {
    return { cart: mapMockCartToDto(cart), errorCode: 'PROMO_EXPIRED' }
  }

  updateMockDatabaseState((state) => {
    const targetCart = state.carts.find((cartItem) => cartItem.id === cart.id)

    if (targetCart === undefined) {
      return
    }

    targetCart.promoCode = promo.code
    targetCart.quoteVersion += 1
  })

  return { cart: getMockCartDto(user, guestCartId), errorCode: null }
}

export function clearMockCartPromo(user: MockDbUser | null, guestCartId: string | null): CartDto {
  const cart = resolveCartForContext(user, guestCartId)

  updateMockDatabaseState((state) => {
    const targetCart = state.carts.find((cartItem) => cartItem.id === cart.id)

    if (targetCart === undefined) {
      return
    }

    targetCart.promoCode = null
    targetCart.quoteVersion += 1
  })

  return getMockCartDto(user, guestCartId)
}

export function buildMockCartQuote(user: MockDbUser | null, guestCartId: string | null): CartQuoteResponse {
  const dbState = getMockDatabaseState()
  const cart = resolveCartForContext(user, guestCartId)
  const issues: CartQuoteLineIssue[] = []

  cart.items.forEach((cartItem) => {
    const nft = dbState.nfts.find((nftItem) => nftItem.id === cartItem.nftId)

    if (nft === undefined) {
      return
    }

    const hasPriceChanged = cartItem.unitPriceEth !== nft.priceEth
    const maxQuantity = getEditionMaxQuantity(nft, cartItem.editionKey)
    const hasQuantityExceeded = cartItem.quantity > maxQuantity

    if (hasPriceChanged) {
      issues.push({
        cartItemId: cartItem.id,
        code: 'PRICE_CHANGED',
        message: 'O preço deste NFT foi atualizado.',
        currentUnitPriceEth: nft.priceEth,
      })
    }

    if (hasQuantityExceeded) {
      issues.push({
        cartItemId: cartItem.id,
        code: 'QUANTITY_EXCEEDED',
        message: 'Quantidade indisponível para a edição selecionada.',
        maxQuantity,
      })
    }
  })

  const cartDto = mapMockCartToDto(cart)
  const hasIssues = issues.length > 0

  return {
    cart: cartDto,
    isStale: hasIssues,
    issues,
  }
}

export function mergeGuestCartIntoUserCart(guestCartId: string | null, user: MockDbUser): void {
  const hasGuestCartId = guestCartId !== null && guestCartId.length > 0

  if (!hasGuestCartId) {
    return
  }

  updateMockDatabaseState((state) => {
    const guestCart = state.carts.find((cart) => cart.guestId === guestCartId)
    const userCart = state.carts.find((cart) => cart.ownerUserId === user.id)

    if (guestCart === undefined || userCart === undefined) {
      return
    }

    guestCart.items.forEach((guestItem) => {
      const existingItem = userCart.items.find(
        (item) => item.nftId === guestItem.nftId && item.editionKey === guestItem.editionKey,
      )

      if (existingItem !== undefined) {
        existingItem.quantity += guestItem.quantity
        return
      }

      userCart.items.push({ ...guestItem, id: createCartItemId() })
    })

    userCart.quoteVersion += 1
    guestCart.items = []
  })
}

export function removePurchasedItemsFromCart(userId: string, purchasedItems: MockDbCartItem[]): void {
  updateMockDatabaseState((state) => {
    const userCart = state.carts.find((cart) => cart.ownerUserId === userId)

    if (userCart === undefined) {
      return
    }

    purchasedItems.forEach((purchasedItem) => {
      const targetItem = userCart.items.find(
        (item) => item.nftId === purchasedItem.nftId && item.editionKey === purchasedItem.editionKey,
      )

      if (targetItem === undefined) {
        return
      }

      const remainingQuantity = targetItem.quantity - purchasedItem.quantity

      if (remainingQuantity <= 0) {
        userCart.items = userCart.items.filter((item) => item.id !== targetItem.id)
        return
      }

      targetItem.quantity = remainingQuantity
    })

    userCart.quoteVersion += 1
  })
}
