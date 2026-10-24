import { Link } from '@tanstack/react-router'

import { mergeClassNames } from '@/utils/mergeClassNames'
import type { HomeCatalogTab } from '@/types/homeCatalog'

export type MobileCatalogTabsProps = {
  tabs: HomeCatalogTab[]
}

export function MobileCatalogTabs({ tabs }: MobileCatalogTabsProps) {
  const tabElements = tabs.map((tab) => {
    const tabClassName = mergeClassNames(
      'shrink-0 pb-2 font-mono text-sm leading-4',
      tab.isActive
        ? 'border-b-2 border-primary font-bold text-text-accent'
        : 'font-medium text-foreground',
    )

    return (
      <li key={tab.id}>
        <Link className={tabClassName} search={tab.search} to={tab.to}>
          {tab.label}
        </Link>
      </li>
    )
  })

  return (
    <ul className="flex items-center gap-4 overflow-x-auto">{tabElements}</ul>
  )
}
