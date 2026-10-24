import { Link } from '@tanstack/react-router'
import { useEffect, useRef, type ChangeEvent, FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { mergeClassNames } from '@/utils/mergeClassNames'
import type { AuthSignInModalProps, AuthSocialButtonProps } from '@/types/auth'

type AuthSocialButtonItemProps = {
  socialButton: AuthSocialButtonProps
}

function AuthSocialButtonItem({ socialButton }: AuthSocialButtonItemProps) {
  return (
    <Button
      className="flex h-10 w-full cursor-pointer items-center justify-center gap-3 rounded-[5px] border border-border transition-colors duration-150 hover:border-primary"
      type="button"
      onClick={socialButton.onClick}
    >
      <img alt="" className="size-5" src={socialButton.iconSrc} />
      <span className="font-mono text-[13px] font-medium leading-4 text-text-secondary">
        {socialButton.label}
      </span>
    </Button>
  )
}

export function AuthSignInModal({
  signInTabLabel,
  signUpTabLabel,
  description,
  email,
  password,
  emailPlaceholder,
  passwordPlaceholder,
  forgotPasswordLabel,
  submitLabel,
  dividerLabel,
  socialButtons,
  closeAriaLabel,
  closeIconSrc,
  passwordToggleAriaLabel,
  passwordToggleIconSrc,
  isPasswordVisible,
  isSubmitting,
  errorMessage,
  onEmailChange,
  onPasswordChange,
  onSignUpTabClick,
  onSubmitClick,
  onCloseClick,
  onPasswordToggleClick,
}: AuthSignInModalProps) {
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const emailInput = emailInputRef.current
    const isEmailVisible = emailInput !== null && emailInput.getClientRects().length > 0

    if (!isEmailVisible) {
      return
    }

    emailInput.focus()
  }, [])

  const socialButtonElements = socialButtons.map((socialButton, socialButtonIndex) => {
    const socialButtonKey = `social-${socialButtonIndex}`

    return (
      <li key={socialButtonKey}>
        <AuthSocialButtonItem socialButton={socialButton} />
      </li>
    )
  })

  const passwordInputType = isPasswordVisible ? 'text' : 'password'

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event.target.value)
  }

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onPasswordChange(event.target.value)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmitClick?.()
  }

  const submitButtonClassName = mergeClassNames(
    'flex h-[45px] w-full items-center justify-center rounded-[5px] bg-primary font-mono text-base font-bold leading-4 text-ink',
    'cursor-pointer transition-colors duration-150 hover:bg-copper-hover disabled:cursor-not-allowed disabled:opacity-60',
  )

  const inputClassName =
    'w-full bg-transparent font-mono text-sm font-normal leading-4 text-foreground outline-none placeholder:text-secondary'

  const hasErrorMessage = errorMessage !== undefined && errorMessage.length > 0
  const errorElement = hasErrorMessage ? (
    <p className="font-mono text-sm leading-4 text-text-accent" role="alert">
      {errorMessage}
    </p>
  ) : null

  return (
    <div
      aria-label={signInTabLabel}
      aria-modal="true"
      className="relative flex w-full max-w-[500px] flex-col bg-surface-card"
      role="dialog"
    >
      <Button
        aria-label={closeAriaLabel}
        className="absolute right-3 top-3 size-[18px] cursor-pointer transition-opacity hover:opacity-80"
        type="button"
        onClick={onCloseClick}
      >
        <img alt="" className="size-[18px]" src={closeIconSrc} />
      </Button>

      <div className="flex flex-col items-center gap-10 px-12 pt-12">
        <div className="flex items-center gap-2">
          <p className="font-mono text-xl font-medium leading-4 text-text-accent">{signInTabLabel}</p>
          <Separator className="h-5 bg-[#F0805F]" orientation="vertical" />
          <Link
            className="cursor-pointer font-mono text-xl font-medium leading-4 text-foreground transition-colors hover:text-text-accent"
            to="/cadastro"
            onClick={onSignUpTabClick}
          >
            {signUpTabLabel}
          </Link>
        </div>
        <p className="text-center font-mono text-[13px] font-normal leading-4 text-foreground">
          {description}
        </p>
      </div>

      <form className="flex flex-col gap-3 px-20 pt-6" onSubmit={handleFormSubmit}>
        <div className="flex h-10 items-center rounded-[5px] border border-border px-4">
          <Input
            ref={emailInputRef}
            autoComplete="email"
            className={inputClassName}
            name="email"
            placeholder={emailPlaceholder}
            type="email"
            value={email}
            onChange={handleEmailInputChange}
          />
        </div>
        <div className="relative flex h-10 items-center rounded-[5px] border border-primary px-4">
          <Input
            autoComplete="current-password"
            className={inputClassName}
            name="password"
            placeholder={passwordPlaceholder}
            type={passwordInputType}
            value={password}
            onChange={handlePasswordInputChange}
          />
          <Button
            aria-label={passwordToggleAriaLabel}
            className="absolute right-3 size-[22.667px] cursor-pointer"
            type="button"
            onClick={onPasswordToggleClick}
          >
            <img alt="" className="size-[22.667px]" src={passwordToggleIconSrc} />
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            className="cursor-pointer font-mono text-sm font-normal leading-4 text-text-accent transition-opacity hover:opacity-80"
            type="button"
          >
            {forgotPasswordLabel}
          </Button>
        </div>
        {errorElement}
        <Button className={submitButtonClassName} disabled={isSubmitting} type="submit">
          {submitLabel}
        </Button>
      </form>

      <div className="flex flex-col gap-3 pt-6">
        <div className="flex items-center gap-3 px-12">
          <div className="h-px flex-1 bg-border" />
          <p className="font-mono text-[13px] font-normal leading-4 text-foreground">{dividerLabel}</p>
          <div className="h-px flex-1 bg-border" />
        </div>
        <ul className="flex flex-col gap-3 px-20 pb-12">{socialButtonElements}</ul>
      </div>

      <div aria-hidden className="h-2.5 w-full bg-primary" />
    </div>
  )
}
