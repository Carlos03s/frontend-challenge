import { Link } from '@tanstack/react-router'
import type { ChangeEvent, FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AuthSocialButtonProps } from '@/types/auth'

export type MobileAuthField = {
  id: string
  placeholder: string
  value: string
  type: 'text' | 'email' | 'password'
  autoComplete: string
  toggleIconSrc?: string
}

export type MobileAuthFormProps = {
  brandLabel: string
  title: string
  fields: MobileAuthField[]
  forgotPasswordLabel?: string
  submitLabel: string
  footerPrompt: string
  footerActionLabel: string
  footerTo: '/login' | '/cadastro'
  dividerLabel: string
  socialButtons: AuthSocialButtonProps[]
  isSubmitting?: boolean
  errorMessage?: string
  onFieldChange: (fieldId: string, value: string) => void
  onSubmit: () => void
}

export function MobileAuthForm({
  brandLabel,
  title,
  fields,
  forgotPasswordLabel,
  submitLabel,
  footerPrompt,
  footerActionLabel,
  footerTo,
  dividerLabel,
  socialButtons,
  isSubmitting,
  errorMessage,
  onFieldChange,
  onSubmit,
}: MobileAuthFormProps) {
  const fieldElements = fields.map((field) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onFieldChange(field.id, event.target.value)
    }

    const toggleElement =
      field.toggleIconSrc !== undefined ? (
        <img alt="" className="size-[18px]" src={field.toggleIconSrc} />
      ) : null

    return (
      <li key={field.id}>
        <label className="flex h-[52px] items-center justify-between rounded-xl border border-border px-4">
          <Input
            autoComplete={field.autoComplete}
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-secondary"
            placeholder={field.placeholder}
            type={field.type}
            value={field.value}
            onChange={handleChange}
          />
          {toggleElement}
        </label>
      </li>
    )
  })

  const socialButtonElements = socialButtons.map((socialButton, socialButtonIndex) => (
    <li key={`${socialButton.label}-${socialButtonIndex}`}>
      <Button
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-border"
        type="button"
        onClick={socialButton.onClick}
      >
        <img alt="" className="size-5" src={socialButton.iconSrc} />
        <span className="font-mono text-sm text-text-secondary">{socialButton.label}</span>
      </Button>
    </li>
  ))

  const forgotPasswordElement =
    forgotPasswordLabel !== undefined ? (
      <p className="text-right font-mono text-sm text-text-accent">{forgotPasswordLabel}</p>
    ) : null

  const hasErrorMessage = errorMessage !== undefined && errorMessage.length > 0
  const errorElement = hasErrorMessage ? (
    <p className="font-mono text-sm text-text-accent" role="alert">
      {errorMessage}
    </p>
  ) : null

  const footerLink =
    footerTo === '/login' ? (
      <Link className="text-text-accent" search={{ redirect: '/' }} to="/login">
        {footerActionLabel}
      </Link>
    ) : (
      <Link className="text-text-accent" to="/cadastro">
        {footerActionLabel}
      </Link>
    )
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <section className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-8 py-10 lg:hidden">
      <p className="font-mono text-4xl font-bold tracking-[1.4px] text-foreground">{brandLabel}</p>
      <h1 className="text-center font-mono text-base font-bold text-foreground">{title}</h1>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <ul className="flex flex-col gap-3">{fieldElements}</ul>
        {forgotPasswordElement}
        {errorElement}
        <Button
          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-full bg-primary font-mono text-base font-bold text-ink disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {submitLabel}
        </Button>
      </form>
      <div className="flex w-full items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs text-foreground">{dividerLabel}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <ul className="flex w-full flex-col gap-3">{socialButtonElements}</ul>
      <p className="font-mono text-sm text-secondary">
        {footerPrompt} {footerLink}
      </p>
    </section>
  )
}
