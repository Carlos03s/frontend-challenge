export type HomeHeaderNavItem = {
  id: string
  label: string
  to: string
  hash?: string
  isActive: boolean
  isDisabled?: boolean
}

export type HomeHeaderProps = {
  brandLabel: string
  brandTo: string
  navItems: HomeHeaderNavItem[]
  cartCountLabel: string
  searchAriaLabel: string
  cartAriaLabel: string
  searchIconSrc: string
  cartIconSrc: string
  loginLabel: string
  loginTo: string
  loginAriaLabel: string
  loginIconSrc: string
  onSearchClick?: () => void
  onCartClick?: () => void
}
