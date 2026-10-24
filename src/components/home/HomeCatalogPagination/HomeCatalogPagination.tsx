import { mergeClassNames } from '@/utils/mergeClassNames'
import type { HomeCatalogPage, HomeCatalogPaginationProps } from '@/types/homeCatalog'

type HomeCatalogPageLinkProps = {
  page: HomeCatalogPage
  onPageClick?: (pageId: string) => void
}

function HomeCatalogPageLink({ page, onPageClick }: HomeCatalogPageLinkProps) {
  const pageClassName = mergeClassNames(
    'flex size-[35px] cursor-pointer items-center justify-center rounded border font-mono text-lg leading-4 transition-colors duration-150',
    page.isActive
      ? 'border-primary bg-primary font-bold text-ink'
      : 'border-border bg-transparent font-normal text-foreground hover:border-primary hover:text-text-accent',
  )
  const ariaCurrent = page.isActive ? 'page' : undefined

  const handleClick = () => {
    onPageClick?.(page.id)
  }

  return (
    <button
      aria-current={ariaCurrent}
      className={pageClassName}
      type="button"
      onClick={handleClick}
    >
      {page.label}
    </button>
  )
}

export function HomeCatalogPagination({
  pages,
  nextAriaLabel,
  nextIconSrc,
  onPageClick,
  onNextClick,
  isNextDisabled,
}: HomeCatalogPaginationProps) {
  const pageLinks = pages.map((page) => (
    <li key={page.id}>
      <HomeCatalogPageLink page={page} onPageClick={onPageClick} />
    </li>
  ))

  const nextButtonClassName = mergeClassNames(
    'flex size-[35px] items-center justify-center rounded border border-border transition-colors duration-150',
    isNextDisabled
      ? 'cursor-not-allowed opacity-40'
      : 'cursor-pointer hover:border-primary hover:bg-surface-card',
  )

  return (
    <nav aria-label="Paginação do catálogo">
      <ul className="flex items-center gap-2">
        {pageLinks}
        <li>
          <button
            aria-label={nextAriaLabel}
            className={nextButtonClassName}
            disabled={isNextDisabled}
            type="button"
            onClick={onNextClick}
          >
            <img alt="" className="size-[18px] shrink-0" height={18} src={nextIconSrc} width={18} />
          </button>
        </li>
      </ul>
    </nav>
  )
}
