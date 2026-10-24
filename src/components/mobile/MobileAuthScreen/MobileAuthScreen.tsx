import type { MobileAuthFormProps } from '@/types/mobile'

export function MobileAuthScreen({
  brandLabel,
  title,
  fields,
  forgotPasswordLabel,
  submitLabel,
  footerLinkLabel,
  footerLinkHref,
  passwordToggleIconSrc,
  socialDividerLabel,
  socialButtons,
}: MobileAuthFormProps) {
  const fieldElements = fields.map((placeholder, fieldIndex) => {
    const fieldKey = `mobile-field-${fieldIndex}`
    const isPasswordField = placeholder.includes('*') || placeholder === 'Senha'
    const isConfirmField = placeholder === 'Confirmar senha'

    const passwordToggleElement = isPasswordField || isConfirmField ? (
      <img alt="" className="size-[18px]" src={passwordToggleIconSrc} />
    ) : null

    return (
      <li key={fieldKey}>
        <div className="flex h-[50px] items-center justify-between rounded-sm border border-border px-4">
          <span className="font-mono text-base text-secondary">{placeholder}</span>
          {passwordToggleElement}
        </div>
      </li>
    )
  })

  const socialButtonElements = socialButtons.map((socialButton) => (
    <li key={socialButton.id}>
      <button
        className="flex h-10 w-full items-center justify-center gap-3 rounded-sm border border-border"
        type="button"
      >
        <img alt="" className="size-5" src={socialButton.iconSrc} />
        <span className="font-mono text-[13px] text-text-secondary">{socialButton.label}</span>
      </button>
    </li>
  ))

  const forgotPasswordElement = forgotPasswordLabel ? (
    <p className="text-right font-mono text-base text-text-accent">{forgotPasswordLabel}</p>
  ) : null

  return (
    <section className="flex w-full min-w-0 flex-col items-center gap-8">
      <p className="font-mono text-[42px] font-bold leading-none tracking-[1.4px] text-foreground">
        {brandLabel}
      </p>
      <h1 className="font-mono text-base font-bold leading-4 text-foreground">{title}</h1>
      <ul className="flex w-full flex-col gap-3">{fieldElements}</ul>
      {forgotPasswordElement}
      <button
        className="flex h-[60px] w-full items-center justify-center rounded-sm bg-primary font-mono text-base font-bold text-ink"
        type="button"
      >
        {submitLabel}
      </button>
      <div className="flex w-full items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[13px] text-foreground">{socialDividerLabel}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <ul className="flex w-full flex-col gap-3">{socialButtonElements}</ul>
      <a className="font-mono text-base text-text-accent" href={footerLinkHref}>
        {footerLinkLabel}
      </a>
    </section>
  )
}
