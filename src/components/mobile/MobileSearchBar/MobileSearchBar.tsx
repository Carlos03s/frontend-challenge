import type { ChangeEvent, FormEvent } from 'react'

import type { MobileSearchBarProps } from '@/types/mobile'

export function MobileSearchBar({
  placeholder,
  searchIconSrc,
  filterAriaLabel,
  filterIconSrc,
  value,
  inputId,
  showsFilterButton = true,
  onValueChange,
  onSearchSubmit,
  onFilterClick,
}: MobileSearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearchSubmit?.()
  }

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.currentTarget.value)
  }

  const filterButton = showsFilterButton ? (
    <button
      aria-label={filterAriaLabel}
      className="flex size-[45px] shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border transition-colors duration-150 hover:border-primary"
      type="button"
      onClick={onFilterClick}
    >
      <img alt="" className="size-[22px]" src={filterIconSrc} />
    </button>
  ) : null

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit}>
      <label className="flex h-[45px] min-w-0 flex-1 items-center gap-2 rounded-xl border border-border px-3">
        <img alt="" className="size-[22px] shrink-0" src={searchIconSrc} />
        <input
          aria-label={placeholder}
          className="w-full bg-transparent font-mono text-base leading-4 text-foreground outline-none placeholder:text-secondary"
          data-catalog-search=""
          id={inputId}
          placeholder={placeholder}
          type="search"
          value={value ?? ''}
          onChange={handleValueChange}
        />
      </label>
      {filterButton}
    </form>
  )
}
