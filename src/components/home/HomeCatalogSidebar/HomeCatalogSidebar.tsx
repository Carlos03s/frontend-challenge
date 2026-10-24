import { Link } from '@tanstack/react-router'
import type { ChangeEvent } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'
import type {
  HomeCatalogSidebarFilterRow,
  HomeCatalogSidebarProps,
} from '@/types/homeCatalogSidebar'

type HomeCatalogSidebarFilterRowItemProps = {
  row: HomeCatalogSidebarFilterRow
}

function HomeCatalogSidebarFilterRowItem({ row }: HomeCatalogSidebarFilterRowItemProps) {
  const isActive = row.isActive
  const labelClassName = mergeClassNames(
    'font-mono text-[15px] font-normal leading-10',
    isActive ? 'text-text-accent' : 'text-text-secondary',
  )
  const countClassName = mergeClassNames(
    'font-mono text-[15px] leading-10',
    isActive ? 'font-bold text-text-accent' : 'font-normal text-text-secondary',
  )

  const rowClassName = mergeClassNames(
    'flex h-10 w-full items-center justify-between gap-3 transition-colors duration-150 hover:opacity-90',
    'cursor-pointer',
  )

  return (
    <Link className={rowClassName} search={row.search} to={row.to}>
      <span className={labelClassName}>{row.label}</span>
      <span className={countClassName}>{row.countLabel}</span>
    </Link>
  )
}

type HomeCatalogSidebarPriceRangeProps = {
  priceRangeSummaryLabel: string
  priceRangeMinValue: number
  priceRangeMaxValue: number
  priceRangeBoundMin: number
  priceRangeBoundMax: number
  priceRangeStep: number
  applyPriceRangeLabel: string
  applyPriceRangeAriaLabel: string
  onPriceRangeMinChange: (priceEth: number) => void
  onPriceRangeMaxChange: (priceEth: number) => void
  onApplyPriceRangeClick?: () => void
}

const priceRangeInputClassName = [
  'pointer-events-none absolute inset-0 z-10 h-[15px] w-full appearance-none bg-transparent',
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-[15px] [&::-moz-range-thumb]:cursor-pointer',
  '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary',
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-[15px]',
  '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none',
  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary',
  '[&::-webkit-slider-thumb]:ring-[3px] [&::-webkit-slider-thumb]:ring-surface-card',
].join(' ')

function HomeCatalogSidebarPriceRange({
  priceRangeSummaryLabel,
  priceRangeMinValue,
  priceRangeMaxValue,
  priceRangeBoundMin,
  priceRangeBoundMax,
  priceRangeStep,
  applyPriceRangeLabel,
  applyPriceRangeAriaLabel,
  onPriceRangeMinChange,
  onPriceRangeMaxChange,
  onApplyPriceRangeClick,
}: HomeCatalogSidebarPriceRangeProps) {
  const priceSpan = priceRangeBoundMax - priceRangeBoundMin
  const minThumbPercent = ((priceRangeMinValue - priceRangeBoundMin) / priceSpan) * 100
  const maxThumbPercent = ((priceRangeMaxValue - priceRangeBoundMin) / priceSpan) * 100

  const trackFillStyle = {
    left: `${minThumbPercent}%`,
    right: `${100 - maxThumbPercent}%`,
  }

  const handleMinInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMinPriceEth = Number(event.target.value)
    const clampedMinPriceEth = Math.min(nextMinPriceEth, priceRangeMaxValue)
    onPriceRangeMinChange(clampedMinPriceEth)
  }

  const handleMaxInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMaxPriceEth = Number(event.target.value)
    const clampedMaxPriceEth = Math.max(nextMaxPriceEth, priceRangeMinValue)
    onPriceRangeMaxChange(clampedMaxPriceEth)
  }

  const applyButtonClassName = mergeClassNames(
    'inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-2',
    'bg-primary font-mono text-base font-bold leading-5 text-ink transition-colors duration-150 hover:bg-copper-hover',
  )

  return (
    <div className="mt-3 flex w-full flex-col items-start gap-3 pl-3">
      <div className="relative h-[15px] w-full">
        <div className="absolute left-0 right-0 top-[6px] h-1 rounded-full bg-surface-track" />
        <div
          aria-hidden
          className="absolute top-[6px] h-1 rounded-full bg-primary"
          style={trackFillStyle}
        />
        <input
          aria-label="Preço mínimo"
          className={priceRangeInputClassName}
          max={priceRangeBoundMax}
          min={priceRangeBoundMin}
          step={priceRangeStep}
          type="range"
          value={priceRangeMinValue}
          onChange={handleMinInputChange}
        />
        <input
          aria-label="Preço máximo"
          className={priceRangeInputClassName}
          max={priceRangeBoundMax}
          min={priceRangeBoundMin}
          step={priceRangeStep}
          type="range"
          value={priceRangeMaxValue}
          onChange={handleMaxInputChange}
        />
      </div>

      <p className="font-mono text-[15px] font-normal leading-none text-foreground">
        {priceRangeSummaryLabel}
      </p>

      <button
        aria-label={applyPriceRangeAriaLabel}
        className={applyButtonClassName}
        type="button"
        onClick={onApplyPriceRangeClick}
      >
        {applyPriceRangeLabel}
      </button>
    </div>
  )
}

type HomeCatalogSidebarSectionTitleProps = {
  title: string
}

function HomeCatalogSidebarSectionTitle({ title }: HomeCatalogSidebarSectionTitleProps) {
  return (
    <h2 className="font-mono text-lg font-bold leading-4 text-foreground">
      {title}
    </h2>
  )
}

export function HomeCatalogSidebar({
  collectionsSectionTitle,
  collectionRows,
  priceRangeSectionTitle,
  priceRangeSummaryLabel,
  priceRangeMinValue,
  priceRangeMaxValue,
  priceRangeBoundMin,
  priceRangeBoundMax,
  priceRangeStep,
  applyPriceRangeLabel,
  applyPriceRangeAriaLabel,
  onPriceRangeMinChange,
  onPriceRangeMaxChange,
  networkSectionTitle,
  networkRows,
  featuredEyebrowLabel,
  featuredTitleLabel,
  featuredImageSrc,
  featuredImageAlt,
  onApplyPriceRangeClick,
}: HomeCatalogSidebarProps) {
  const collectionRowItems = collectionRows.map((row) => (
    <li key={row.id}>
      <HomeCatalogSidebarFilterRowItem row={row} />
    </li>
  ))

  const networkRowItems = networkRows.map((row) => (
    <li key={row.id}>
      <HomeCatalogSidebarFilterRowItem row={row} />
    </li>
  ))

  const filtersPanel = (
    <div className="flex w-full min-w-0 flex-col gap-10 overflow-hidden bg-surface-card p-5 lg:min-h-[785px]">
      <div>
        <HomeCatalogSidebarSectionTitle title={collectionsSectionTitle} />
        <ul className="mt-3 px-3">{collectionRowItems}</ul>
      </div>

      <div>
        <HomeCatalogSidebarSectionTitle title={priceRangeSectionTitle} />
        <HomeCatalogSidebarPriceRange
          applyPriceRangeAriaLabel={applyPriceRangeAriaLabel}
          applyPriceRangeLabel={applyPriceRangeLabel}
          priceRangeBoundMax={priceRangeBoundMax}
          priceRangeBoundMin={priceRangeBoundMin}
          priceRangeMaxValue={priceRangeMaxValue}
          priceRangeMinValue={priceRangeMinValue}
          priceRangeStep={priceRangeStep}
          priceRangeSummaryLabel={priceRangeSummaryLabel}
          onApplyPriceRangeClick={onApplyPriceRangeClick}
          onPriceRangeMaxChange={onPriceRangeMaxChange}
          onPriceRangeMinChange={onPriceRangeMinChange}
        />
      </div>

      <div>
        <HomeCatalogSidebarSectionTitle title={networkSectionTitle} />
        <ul className="mt-3 pl-3">{networkRowItems}</ul>
      </div>
    </div>
  )

  const featuredPanel = (
    <div className="h-[470px] w-full min-w-0 overflow-hidden bg-gradient-to-b from-primary/10 to-primary/[0.03] pt-6">
      <p className="px-5 font-mono text-2xl font-bold uppercase leading-8 text-text-accent">
        {featuredEyebrowLabel}
      </p>
      <p className="mt-4 px-5 text-center font-mono text-[22px] font-bold uppercase leading-4 text-foreground">
        {featuredTitleLabel}
      </p>
      <div className="mt-4 h-[368px] w-full min-w-0 overflow-hidden rounded-[22px]">
        <img
          alt={featuredImageAlt}
          className="block size-full object-cover object-center"
          height={368}
          src={featuredImageSrc}
          width={310}
        />
      </div>
    </div>
  )

  return (
    <aside aria-label="Filtros do catálogo" className="w-full min-w-0 shrink-0 lg:w-[min(310px,32%)]">
      {filtersPanel}
      <div className="mt-6">{featuredPanel}</div>
    </aside>
  )
}
