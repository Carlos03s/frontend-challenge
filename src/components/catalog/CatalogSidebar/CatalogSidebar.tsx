import { mergeClassNames } from '@/utils/mergeClassNames'
import type { CatalogSidebarFilterItem, CatalogSidebarProps } from '@/types/catalogSidebar'

type CatalogSidebarFilterLinkProps = {
  item: CatalogSidebarFilterItem
}

function CatalogSidebarFilterLink({ item }: CatalogSidebarFilterLinkProps) {
  const isSelected = item.isSelected
  const linkClassName = mergeClassNames(
    'flex w-full items-center justify-between font-mono text-xs leading-none',
    isSelected ? 'text-sand' : 'text-sand/55',
  )

  return (
    <a className={linkClassName} href={item.href}>
      <span>{item.label}</span>
      <span>{item.countLabel}</span>
    </a>
  )
}

type CatalogSidebarFilterListProps = {
  items: CatalogSidebarFilterItem[]
}

function CatalogSidebarFilterList({ items }: CatalogSidebarFilterListProps) {
  const filterLinks = items.map((item) => (
    <li key={item.id}>
      <CatalogSidebarFilterLink item={item} />
    </li>
  ))

  return <ul className="flex flex-col gap-3">{filterLinks}</ul>
}

type CatalogSidebarPriceRangeProps = {
  priceRangeLabel: string
  priceRangeStartPercent: number
  priceRangeEndPercent: number
  applyButtonLabel: string
  onApplyPriceRangeClick?: () => void
}

function CatalogSidebarPriceRange({
  priceRangeLabel,
  priceRangeStartPercent,
  priceRangeEndPercent,
  applyButtonLabel,
  onApplyPriceRangeClick,
}: CatalogSidebarPriceRangeProps) {
  const rangeFillWidth = priceRangeEndPercent - priceRangeStartPercent
  const rangeFillStyle = {
    left: `${priceRangeStartPercent}%`,
    width: `${rangeFillWidth}%`,
  }
  const startThumbStyle = { left: `${priceRangeStartPercent}%` }
  const endThumbStyle = { left: `${priceRangeEndPercent}%` }

  const applyButtonClassName = mergeClassNames(
    'mt-4 flex h-9 w-full items-center justify-center rounded-md',
    'bg-sand font-mono text-xs font-bold uppercase leading-none text-ink',
  )

  return (
    <div>
      <div className="relative mt-4 h-1.5 rounded-full bg-[#2a211c]">
        <div
          aria-hidden
          className="absolute top-0 h-full rounded-full bg-sand"
          style={rangeFillStyle}
        />
        <span
          aria-hidden
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand"
          style={startThumbStyle}
        />
        <span
          aria-hidden
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand"
          style={endThumbStyle}
        />
      </div>

      <p className="mt-3 font-mono text-[11px] leading-none text-sand/70">{priceRangeLabel}</p>

      <button className={applyButtonClassName} type="button" onClick={onApplyPriceRangeClick}>
        {applyButtonLabel}
      </button>
    </div>
  )
}

export function CatalogSidebar({
  collectionsTitle,
  collectionItems,
  priceRangeTitle,
  priceRangeLabel,
  priceRangeStartPercent,
  priceRangeEndPercent,
  applyButtonLabel,
  networkTitle,
  networkItems,
  featuredEyebrowLabel,
  featuredTitleLabel,
  featuredImageSrc,
  featuredImageAlt,
  featuredHref,
  onApplyPriceRangeClick,
}: CatalogSidebarProps) {
  const sectionTitleClassName =
    'font-mono text-sm font-bold leading-none tracking-[0.04em] text-foreground'

  const featuredPromo = (
    <a className="mt-12 block" href={featuredHref}>
      <p className="font-mono text-[11px] font-bold uppercase leading-none tracking-[0.08em] text-sand">
        {featuredEyebrowLabel}
      </p>
      <h2
        className="mt-2 font-mono text-sm font-bold uppercase leading-none tracking-[0.04em] text-foreground"
        id="catalog-sidebar-featured-title"
      >
        {featuredTitleLabel}
      </h2>
      <img
        alt={featuredImageAlt}
        className="mt-3 block h-auto w-full rounded-t-[20px]"
        height={204}
        src={featuredImageSrc}
        width={248}
      />
    </a>
  )

  return (
    <aside className="w-full min-w-0 max-w-[248px] shrink-0 bg-background">
      <section aria-labelledby="catalog-sidebar-collections-title">
        <h2 className={sectionTitleClassName} id="catalog-sidebar-collections-title">
          {collectionsTitle}
        </h2>
        <div className="mt-4">
          <CatalogSidebarFilterList items={collectionItems} />
        </div>
      </section>

      <section aria-labelledby="catalog-sidebar-price-title" className="mt-10">
        <h2 className={sectionTitleClassName} id="catalog-sidebar-price-title">
          {priceRangeTitle}
        </h2>
        <CatalogSidebarPriceRange
          applyButtonLabel={applyButtonLabel}
          priceRangeEndPercent={priceRangeEndPercent}
          priceRangeLabel={priceRangeLabel}
          priceRangeStartPercent={priceRangeStartPercent}
          onApplyPriceRangeClick={onApplyPriceRangeClick}
        />
      </section>

      <section aria-labelledby="catalog-sidebar-network-title" className="mt-10">
        <h2 className={sectionTitleClassName} id="catalog-sidebar-network-title">
          {networkTitle}
        </h2>
        <div className="mt-4">
          <CatalogSidebarFilterList items={networkItems} />
        </div>
      </section>

      <section aria-labelledby="catalog-sidebar-featured-title">{featuredPromo}</section>
    </aside>
  )
}
