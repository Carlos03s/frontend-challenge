import { HomeCatalogGrid } from '@/components/home/HomeCatalogGrid/HomeCatalogGrid'
import { HomeCatalogPagination } from '@/components/home/HomeCatalogPagination/HomeCatalogPagination'
import { HomeCatalogToolbar } from '@/components/home/HomeCatalogToolbar/HomeCatalogToolbar'
import type { HomeCatalogSectionProps } from '@/types/homeCatalog'

export function HomeCatalogSection({
  sidebarElement,
  toolbarProps,
  gridProps,
  paginationProps,
}: HomeCatalogSectionProps) {
  return (
    <section
      aria-label="Catálogo de NFTs"
      className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-12 lg:flex-row"
    >
      {sidebarElement}
      <div className="flex min-w-0 flex-1 flex-col items-end gap-[88px]">
        <div className="flex w-full flex-col items-start gap-8">
          <HomeCatalogToolbar {...toolbarProps} />
          <HomeCatalogGrid {...gridProps} />
        </div>
        <HomeCatalogPagination {...paginationProps} />
      </div>
    </section>
  )
}
