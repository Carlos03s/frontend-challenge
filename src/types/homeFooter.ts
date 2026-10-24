export type HomeFooterFeature = {
  id: string
  medallionLabel: string
  title: string
  description: string
}

export type HomeFooterLink = {
  id: string
  label: string
  href: string
}

export type HomeFooterLinkColumn = {
  id: string
  title: string
  links: HomeFooterLink[]
}

export type HomeFooterSocialLink = {
  id: string
  href: string
  ariaLabel: string
  iconSrc: string
}

export type HomeFooterProps = {
  features: HomeFooterFeature[]
  newsletterTitle: string
  newsletterPlaceholder: string
  newsletterSubmitLabel: string
  newsletterDescription: string
  brandLabel: string
  brandDescriptionLineOne: string
  brandDescriptionLineTwo: string
  contactEmailLabel: string
  contactEmailHref: string
  phoneLabel: string
  linkColumns: HomeFooterLinkColumn[]
  socialSectionTitle: string
  socialLinks: HomeFooterSocialLink[]
  walletSectionTitle: string
  walletsLabel: string
  copyrightLabel: string
  onNewsletterSubmit?: () => void
}
