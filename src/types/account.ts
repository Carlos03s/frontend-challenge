export type AccountNavItem = {
  id: string
  label: string
  isActive: boolean
  to?: string
  isDisabled?: boolean
  action?: 'logout'
}

export type AccountSidebarProps = {
  sectionTitle: string
  navItems: AccountNavItem[]
  onLogoutClick?: () => void
}

export type SectionHeadingProps = {
  title: string
}
