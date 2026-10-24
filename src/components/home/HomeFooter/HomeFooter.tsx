import { HomeFooterFeature } from '@/components/home/HomeFooterFeature/HomeFooterFeature'
import { HomeFooterLinkColumn } from '@/components/home/HomeFooterLinkColumn/HomeFooterLinkColumn'
import type { HomeFooterProps } from '@/types/homeFooter'

export function HomeFooter({
  features,
  newsletterTitle,
  newsletterPlaceholder,
  newsletterSubmitLabel,
  newsletterDescription,
  brandLabel,
  brandDescriptionLineOne,
  brandDescriptionLineTwo,
  contactEmailLabel,
  contactEmailHref,
  phoneLabel,
  linkColumns,
  socialSectionTitle,
  socialLinks,
  walletSectionTitle,
  walletsLabel,
  copyrightLabel,
  onNewsletterSubmit,
}: HomeFooterProps) {
  const featureElements = features.map((feature, featureIndex) => {
    const isFirstFeature = featureIndex === 0
    const wrapperClassName = isFirstFeature
      ? 'flex min-w-0 flex-1 flex-col items-start'
      : 'flex min-w-0 flex-1 flex-col items-start border-l border-primary'

    return (
      <div className={wrapperClassName} key={feature.id}>
        <HomeFooterFeature {...feature} />
      </div>
    )
  })

  const linkColumnElements = linkColumns.map((linkColumn) => (
    <HomeFooterLinkColumn key={linkColumn.id} {...linkColumn} />
  ))

  const socialLinkElements = socialLinks.map((socialLink) => (
    <li key={socialLink.id}>
      <a aria-label={socialLink.ariaLabel} href={socialLink.href}>
        <img alt="" className="size-[30px]" src={socialLink.iconSrc} />
      </a>
    </li>
  ))

  const newsletterElement = (
    <div className="flex min-w-0 flex-[1.35] flex-col gap-3 border-l border-primary px-4">
      <h3 className="font-mono text-lg font-bold leading-4 text-foreground">{newsletterTitle}</h3>
      <div className="flex h-10 w-full overflow-hidden rounded-md bg-surface-dark shadow-[0_0_10px_rgba(10,6,4,0.45)]">
        <input
          aria-label={newsletterPlaceholder}
          className="min-w-0 flex-1 bg-transparent px-3 font-mono text-sm leading-4 text-secondary outline-none placeholder:text-secondary"
          placeholder={newsletterPlaceholder}
          type="email"
        />
        <button
          className="h-10 shrink-0 px-4 bg-primary font-mono text-lg font-bold leading-4 text-ink"
          type="button"
          onClick={onNewsletterSubmit}
        >
          {newsletterSubmitLabel}
        </button>
      </div>
      <p className="font-mono text-[13px] font-normal leading-[22px] text-text-secondary">
        {newsletterDescription}
      </p>
    </div>
  )

  return (
    <footer className="mx-auto flex w-full min-w-0 max-w-[1200px] flex-col items-start">
      <div className="flex w-full min-w-0 flex-col items-start bg-surface-card p-6 lg:p-8">
        <div className="flex w-full min-w-0 flex-col gap-8 lg:flex-row lg:items-start">
          {featureElements}
          {newsletterElement}
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-4 bg-surface-dark p-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-6 lg:p-8">
        <p className="min-w-0 font-mono text-sm font-bold leading-none tracking-[1.4px] text-foreground">
          {brandLabel}
        </p>
        <p className="min-w-0 font-mono text-sm font-normal leading-[22px] text-foreground">
          <span className="block">{brandDescriptionLineOne}</span>
          <span className="block">{brandDescriptionLineTwo}</span>
        </p>
        <a
          className="min-w-0 font-mono text-sm font-normal leading-[22px] text-foreground"
          href={contactEmailHref}
        >
          {contactEmailLabel}
        </a>
        <p className="min-w-0 font-mono text-sm font-normal leading-[22px] text-foreground">
          {phoneLabel}
        </p>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-10 bg-surface-card p-6 lg:flex-row lg:items-start lg:gap-10 lg:p-8">
        {linkColumnElements}
        <div className="flex min-w-0 flex-1 flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h3 className="font-mono text-lg font-bold leading-4 text-foreground">
              {socialSectionTitle}
            </h3>
            <ul className="flex items-center gap-2.5">{socialLinkElements}</ul>
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <h3 className="font-mono text-lg font-bold leading-4 text-foreground">
              {walletSectionTitle}
            </h3>
            <p className="flex min-h-[26px] w-full items-center justify-center rounded-md border border-border-soft bg-surface-dark px-2 py-1 text-center font-mono text-[9px] font-bold leading-none tracking-[0.1px] text-text-accent">
              {walletsLabel}
            </p>
          </div>
        </div>
      </div>

      <p className="h-[30px] w-full bg-background text-center font-mono text-sm font-normal leading-[30px] text-foreground">
        {copyrightLabel}
      </p>
    </footer>
  )
}
