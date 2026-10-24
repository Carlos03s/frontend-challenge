import { Link } from '@tanstack/react-router'

import { mergeClassNames } from '@/utils/mergeClassNames'
import type { HomeCatalogTab, HomeCatalogToolbarProps } from '@/types/homeCatalog'

type HomeCatalogTabLinkProps = {
  tab: HomeCatalogTab
}

function HomeCatalogTabLink({ tab }: HomeCatalogTabLinkProps) {
  const tabClassName = mergeClassNames(
    'cursor-pointer border-b-2 pb-1 font-mono text-[15px] font-medium leading-4 transition-colors duration-150',
    tab.isActive
      ? 'border-primary text-text-accent'
      : 'border-transparent text-foreground hover:text-text-accent',
  )

  return (
    <Link className={tabClassName} search={tab.search} to={tab.to}>
      {tab.label}
    </Link>
  )
}

export function HomeCatalogToolbar({
  tabs,
  sortPrefixLabel,
  sortLabel,
  sortAriaLabel,
  onSortClick,
}: HomeCatalogToolbarProps) {
  const tabLinks = tabs.map((tab) => (
    <li key={tab.id}>
      <HomeCatalogTabLink tab={tab} />
    </li>
  ))

  const sortButtonClassName = mergeClassNames(
    'hidden cursor-pointer items-center gap-2 font-mono text-[15px] font-normal leading-4 text-foreground',
    'transition-opacity duration-150 hover:opacity-80 lg:flex',
  )

  return (
    <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-4">
      <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2">{tabLinks}</ul>

      <button
        aria-label={sortAriaLabel}
        className={sortButtonClassName}
        type="button"
        onClick={onSortClick}
      >
        <span>{sortPrefixLabel}</span>
        <span>{sortLabel}</span>
      </button>
    </div>
  )
}
