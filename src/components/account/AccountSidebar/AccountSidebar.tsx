import { Link } from '@tanstack/react-router'

import { mergeClassNames } from '@/utils/mergeClassNames'
import type { AccountNavItem, AccountSidebarProps } from '@/types/account'

type AccountNavLinkProps = {
  item: AccountNavItem
  onLogoutClick?: () => void
}

function AccountNavLink({ item, onLogoutClick }: AccountNavLinkProps) {
  const linkClassName = mergeClassNames(
    'block w-full px-4 py-3 text-left font-mono text-base leading-4 transition-colors duration-150',
    item.isActive ? 'bg-surface-dark text-text-accent' : 'text-foreground hover:bg-surface-dark/60',
    item.isDisabled ? 'cursor-not-allowed opacity-50 hover:bg-transparent' : 'cursor-pointer',
  )

  const isLogoutAction = item.action === 'logout'

  if (isLogoutAction) {
    const handleLogoutClick = () => {
      onLogoutClick?.()
    }

    return (
      <button className={linkClassName} type="button" onClick={handleLogoutClick}>
        {item.label}
      </button>
    )
  }

  const isDisabled = item.isDisabled === true

  if (isDisabled) {
    return (
      <span aria-disabled className={linkClassName}>
        {item.label}
      </span>
    )
  }

  const navTo = item.to ?? '/'

  return (
    <Link className={linkClassName} to={navTo}>
      {item.label}
    </Link>
  )
}

export function AccountSidebar({ sectionTitle, navItems, onLogoutClick }: AccountSidebarProps) {
  const navLinks = navItems.map((item) => (
    <li key={item.id}>
      <AccountNavLink item={item} onLogoutClick={onLogoutClick} />
    </li>
  ))

  return (
    <nav aria-label={sectionTitle} className="w-full min-w-0 bg-surface-card lg:w-[min(310px,32%)] lg:shrink-0">
      <p className="px-2.5 py-2.5 font-mono text-base font-bold leading-4 text-foreground">
        {sectionTitle}
      </p>
      <ul>{navLinks}</ul>
    </nav>
  )
}
