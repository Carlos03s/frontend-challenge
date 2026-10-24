import { Heart, Home, ScanLine, ShoppingCart, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { mergeClassNames } from '@/utils/mergeClassNames'
import type { MobileTabBarProps, MobileTabItem } from '@/types/mobile'

const mobileTabIcons: Record<string, LucideIcon> = {
  home: Home,
  favorites: Heart,
  cart: ShoppingCart,
  profile: UserRound,
}

type MobileTabButtonProps = {
  tab: MobileTabItem
  isActive: boolean
  cartCountLabel?: string
}

function MobileTabButton({ tab, isActive, cartCountLabel }: MobileTabButtonProps) {
  const TabIcon = mobileTabIcons[tab.id] ?? Home
  const isCartTab = tab.id === 'cart'
  const hasCartCount = isCartTab && cartCountLabel !== undefined && cartCountLabel !== '0'
  const buttonClassName = mergeClassNames(
    'relative flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-150',
    isActive ? 'text-text-accent' : 'text-secondary hover:text-foreground',
  )

  const handleClick = () => {
    tab.onClick?.()
  }

  const cartBadgeElement = hasCartCount ? (
    <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[10px] font-bold leading-4 text-ink">
      {cartCountLabel}
    </span>
  ) : null

  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      aria-label={tab.ariaLabel}
      className={buttonClassName}
      type="button"
      onClick={handleClick}
    >
      <TabIcon aria-hidden size={22} strokeWidth={1.75} />
      {cartBadgeElement}
    </button>
  )
}

export function MobileTabBar({
  activeTabId,
  tabs,
  centerActionAriaLabel,
  cartCountLabel,
  onCenterActionClick,
}: MobileTabBarProps) {
  const leftTabs = tabs.filter((tab) => tab.id === 'home' || tab.id === 'favorites')
  const rightTabs = tabs.filter((tab) => tab.id === 'cart' || tab.id === 'profile')

  const leftTabElements = leftTabs.map((tab) => (
    <li key={tab.id}>
      <MobileTabButton cartCountLabel={cartCountLabel} isActive={tab.id === activeTabId} tab={tab} />
    </li>
  ))

  const rightTabElements = rightTabs.map((tab) => (
    <li key={tab.id}>
      <MobileTabButton cartCountLabel={cartCountLabel} isActive={tab.id === activeTabId} tab={tab} />
    </li>
  ))

  const handleCenterClick = () => {
    onCenterActionClick?.()
  }

  return (
    <nav
      aria-label="Navegação mobile"
      className="relative mx-auto flex h-[76px] w-full max-w-[480px] items-center justify-between bg-surface-card px-6"
    >
      <ul className="flex items-center gap-2">{leftTabElements}</ul>
      <button
        aria-label={centerActionAriaLabel}
        className="absolute left-1/2 top-0 flex size-16 -translate-x-1/2 -translate-y-1/3 cursor-pointer items-center justify-center rounded-full bg-primary text-ink shadow-[0_8px_24px_rgba(210,138,76,0.45)] transition-transform duration-150 hover:scale-105"
        type="button"
        onClick={handleCenterClick}
      >
        <ScanLine aria-hidden size={26} strokeWidth={1.75} />
      </button>
      <ul className="flex items-center gap-2">{rightTabElements}</ul>
    </nav>
  )
}
