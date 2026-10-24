import { Link } from '@tanstack/react-router'

import { mergeClassNames } from '@/utils/mergeClassNames'
import type { HomeHeaderNavItem, HomeHeaderProps } from '@/types/homeHeader'

type HomeHeaderNavLinkProps = {
  item: HomeHeaderNavItem
}

function HomeHeaderNavLink({ item }: HomeHeaderNavLinkProps) {
  const isActive = item.isActive
  const isDisabled = item.isDisabled === true
  const linkClassName = mergeClassNames(
    'relative h-[34px] font-mono text-base leading-none transition-colors duration-150',
    isActive
      ? 'font-bold text-text-accent after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-primary after:content-[""]'
      : 'font-normal text-foreground hover:text-text-accent',
    isDisabled ? 'cursor-not-allowed opacity-50 hover:text-foreground' : 'cursor-pointer',
  )

  if (isDisabled) {
    return (
      <span aria-disabled className={linkClassName}>
        {item.label}
      </span>
    )
  }

  return (
    <Link className={linkClassName} hash={item.hash} to={item.to}>
      {item.label}
    </Link>
  )
}

export function HomeHeader({
  brandLabel,
  brandTo,
  navItems,
  cartCountLabel,
  searchAriaLabel,
  cartAriaLabel,
  searchIconSrc,
  cartIconSrc,
  loginLabel,
  loginTo,
  loginAriaLabel,
  loginIconSrc,
  onSearchClick,
  onCartClick,
}: HomeHeaderProps) {
  const navLinks = navItems.map((item) => (
    <li key={item.id}>
      <HomeHeaderNavLink item={item} />
    </li>
  ))

  const brandLinkClassName = mergeClassNames(
    'inline-flex h-[34.3px] w-auto shrink-0 items-center',
    'font-mono text-sm font-bold leading-none tracking-[1.4px] text-foreground',
    'cursor-pointer transition-colors duration-150 hover:text-text-accent',
  )

  const iconButtonClassName =
    'cursor-pointer transition-opacity duration-150 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

  const loginLinkClassName = mergeClassNames(
    'inline-flex h-[35px] w-auto items-center justify-center gap-1 rounded-md px-3',
    'bg-primary font-mono text-base font-medium leading-none text-ink',
    'cursor-pointer transition-colors duration-150 hover:bg-copper-hover',
  )

  return (
    <header className="bg-background">
      <div className="mx-auto flex h-[45px] w-full min-w-0 max-w-[1200px] items-center justify-between gap-4 border-b border-border">
        <Link className={brandLinkClassName} to={brandTo}>
          {brandLabel}
        </Link>

        <nav aria-label="Principal">
          <ul className="flex h-[34px] min-w-0 items-start gap-4 xl:gap-10">{navLinks}</ul>
        </nav>

        <div className="flex h-[35px] shrink-0 items-center gap-4 xl:gap-7">
          <button
            aria-label={searchAriaLabel}
            className={mergeClassNames(iconButtonClassName, 'size-5')}
            type="button"
            onClick={onSearchClick}
          >
            <img alt="" className="size-5" src={searchIconSrc} />
          </button>

          <button
            aria-label={cartAriaLabel}
            className={mergeClassNames(iconButtonClassName, 'relative size-6')}
            type="button"
            onClick={onCartClick}
          >
            <img alt="" className="size-6" src={cartIconSrc} />
            <span className="absolute -right-[7px] top-0 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-medium leading-none text-ink ring-2 ring-primary">
              {cartCountLabel}
            </span>
          </button>

          <Link aria-label={loginAriaLabel} className={loginLinkClassName} to={loginTo}>
            <img alt="" className="size-5" src={loginIconSrc} />
            {loginLabel}
          </Link>
        </div>
      </div>
    </header>
  )
}
