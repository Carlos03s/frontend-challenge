import { useState } from 'react'

import {
  catalogPriceRangeBoundMaxEth,
  catalogPriceRangeBoundMinEth,
} from '@/consts/catalogPriceRange'
import type { CatalogUrlSearch } from '@/utils/buildCatalogSearchParams'
import {
  formatCatalogPriceRangeLabel,
  parseCatalogPriceEth,
} from '@/utils/formatCatalogPriceRangeLabel'

export function useCatalogPriceRangeDraft(search: CatalogUrlSearch) {
  const minPriceFromUrl = parseCatalogPriceEth(search.minPriceEth, catalogPriceRangeBoundMinEth)
  const maxPriceFromUrl = parseCatalogPriceEth(search.maxPriceEth, catalogPriceRangeBoundMaxEth)
  const [minPriceEth, setMinPriceEth] = useState(minPriceFromUrl)
  const [maxPriceEth, setMaxPriceEth] = useState(maxPriceFromUrl)
  const [appliedMinPriceEth, setAppliedMinPriceEth] = useState(minPriceFromUrl)
  const [appliedMaxPriceEth, setAppliedMaxPriceEth] = useState(maxPriceFromUrl)
  const hasMinPriceChanged = minPriceFromUrl !== appliedMinPriceEth
  const hasMaxPriceChanged = maxPriceFromUrl !== appliedMaxPriceEth
  const hasPriceRangeChanged = hasMinPriceChanged || hasMaxPriceChanged

  if (hasPriceRangeChanged) {
    setAppliedMinPriceEth(minPriceFromUrl)
    setAppliedMaxPriceEth(maxPriceFromUrl)
    setMinPriceEth(minPriceFromUrl)
    setMaxPriceEth(maxPriceFromUrl)
  }

  const priceRangeSummaryLabel = formatCatalogPriceRangeLabel(minPriceEth, maxPriceEth)

  return {
    minPriceEth,
    maxPriceEth,
    priceRangeSummaryLabel,
    setMinPriceEth,
    setMaxPriceEth,
  }
}
