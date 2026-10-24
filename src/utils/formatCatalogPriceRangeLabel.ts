export function formatCatalogPriceEth(priceEth: number): string {
  return priceEth.toFixed(2).replace('.', ',')
}

export function formatCatalogPriceRangeLabel(minPriceEth: number, maxPriceEth: number): string {
  const minLabel = formatCatalogPriceEth(minPriceEth)
  const maxLabel = formatCatalogPriceEth(maxPriceEth)

  return `Preço: ${minLabel} - ${maxLabel} ETH`
}

export function parseCatalogPriceEth(priceEth: string | undefined, fallbackPriceEth: number): number {
  if (priceEth === undefined || priceEth.length === 0) {
    return fallbackPriceEth
  }

  const parsedPriceEth = Number(priceEth)
  const isValidPrice = Number.isFinite(parsedPriceEth)

  if (!isValidPrice) {
    return fallbackPriceEth
  }

  return parsedPriceEth
}
