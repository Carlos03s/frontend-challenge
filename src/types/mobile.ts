export type MobileTabItem = {
  id: string
  ariaLabel: string
  iconSrc: string
  onClick?: () => void
}

export type MobileTabBarProps = {
  activeTabId: string
  tabs: MobileTabItem[]
  centerActionIconSrc: string
  centerActionAriaLabel: string
  cartCountLabel?: string
  onCenterActionClick?: () => void
}

export type MobileSearchBarProps = {
  placeholder: string
  searchIconSrc: string
  filterAriaLabel: string
  filterIconSrc: string
  value?: string
  inputId?: string
  showsFilterButton?: boolean
  onValueChange?: (value: string) => void
  onSearchSubmit?: () => void
  onFilterClick?: () => void
}

export type MobileHeroBannerProps = {
  eyebrowLabel: string
  titleLineOne: string
  titleLineTwo: string
  description: string
  ctaLabel: string
  ctaArrowIconSrc: string
  featuredImageSrc: string
  featuredImageAlt: string
  accentImageSrc: string
  accentImageAlt: string
  onCtaClick?: () => void
}

export type MobileNftDetailPanelProps = {
  title: string
  priceLabel: string
  editionLabel: string
  description: string
  buyLabel: string
  favoriteLabel: string
}

export type MobileWalletOption = {
  id: string
  label: string
  markLabel: string
  isSelected: boolean
}

export type MobileCheckoutPanelProps = {
  breadcrumbLabel: string
  collectorTitle: string
  emailPlaceholder: string
  networkPlaceholder: string
  walletPlaceholder: string
  selectArrowIconSrc: string
  walletOptions: MobileWalletOption[]
  totalPrefixLabel: string
  totalValueLabel: string
  confirmLabel: string
}

export type MobileAuthFormProps = {
  brandLabel: string
  title: string
  fields: string[]
  forgotPasswordLabel?: string
  submitLabel: string
  footerLinkLabel: string
  footerLinkHref: string
  passwordToggleIconSrc: string
  socialDividerLabel: string
  socialButtons: { id: string; label: string; iconSrc: string }[]
}
