import type { ChangeEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { FormFieldDisplay } from '@/components/forms/FormFieldDisplay/FormFieldDisplay'
import type { ProfileDetailsFormProps, ProfilePasswordField } from '@/types/profile'

type ProfilePasswordInputProps = {
  field: ProfilePasswordField
}

function ProfilePasswordInput({ field }: ProfilePasswordInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    field.onValueChange?.(event.target.value)
  }

  const isEditable = field.onValueChange !== undefined
  const passwordValue = field.value ?? ''

  const editableField = (
    <Input
      className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-secondary"
      placeholder={field.placeholder}
      type="password"
      value={passwordValue}
      onChange={handleChange}
    />
  )
  const staticField = <span className="font-mono text-sm text-secondary">{field.placeholder}</span>
  const fieldContent = isEditable ? editableField : staticField

  return (
    <div className="flex w-full max-w-[417px] flex-col gap-3">
      <Label className="font-mono text-[15px] leading-[15px] text-foreground">{field.label}</Label>
      <div className="flex h-10 items-center rounded-sm border border-border px-3">{fieldContent}</div>
    </div>
  )
}

export function ProfileDetailsForm({
  profileFields,
  ensField,
  ensPrefixLabel,
  ensSelectArrowIconSrc,
  walletAliasField,
  avatarLabel,
  avatarChangeLabel,
  avatarRemoveLabel,
  avatarIconSrc,
  changePasswordTitle,
  passwordFields,
  saveLabel,
  formErrorMessage,
  avatarImageSrc,
  onChangeAvatarClick,
  onRemoveAvatarClick,
  onSaveClick,
}: ProfileDetailsFormProps) {
  const profileFieldElements = profileFields.map((field, fieldIndex) => {
    const fieldKey = `profile-${fieldIndex}`

    return (
      <li key={fieldKey}>
        <FormFieldDisplay {...field} />
      </li>
    )
  })

  const passwordFieldElements = passwordFields.map((field) => (
    <li key={field.id}>
      <ProfilePasswordInput field={field} />
    </li>
  ))

  const hasAvatarImage = avatarImageSrc !== undefined && avatarImageSrc !== null && avatarImageSrc.length > 0
  const avatarVisual = hasAvatarImage ? (
    <img alt="" className="size-[50px] rounded-sm object-cover" src={avatarImageSrc} />
  ) : (
    <div className="flex size-[50px] items-center justify-center rounded-sm border border-border">
      <img alt="" className="size-6" src={avatarIconSrc} />
    </div>
  )
  const hasFormError = formErrorMessage !== undefined && formErrorMessage.length > 0
  const formErrorElement = hasFormError ? (
    <p className="font-mono text-sm leading-5 text-text-accent" role="alert">
      {formErrorMessage}
    </p>
  ) : null

  return (
    <section className="flex w-full min-w-0 max-w-[862px] flex-1 flex-col gap-10">
      <ul className="grid grid-cols-2 gap-x-7 gap-y-6">{profileFieldElements}</ul>

      <div className="grid grid-cols-2 gap-x-7">
        <FormFieldDisplay {...ensField} />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <span className="font-mono text-[15px] text-foreground">Nome ENS</span>
            <span className="font-mono text-[22px] text-[#F0805F]">*</span>
          </div>
          <div className="flex h-10 w-[78px] items-center justify-between rounded-sm border border-border px-2.5">
            <span className="font-mono text-[15px] text-foreground">{ensPrefixLabel}</span>
            <img alt="" className="size-5" src={ensSelectArrowIconSrc} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-7">
        <FormFieldDisplay {...walletAliasField} />
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[15px] text-foreground">{avatarLabel}</span>
          <div className="flex items-center gap-6">
            {avatarVisual}
            <div className="flex items-center gap-5">
              <Button
                className="cursor-pointer font-mono text-base text-foreground"
                type="button"
                onClick={onChangeAvatarClick}
              >
                {avatarChangeLabel}
              </Button>
              <Button
                className="cursor-pointer font-mono text-base text-foreground"
                type="button"
                onClick={onRemoveAvatarClick}
              >
                {avatarRemoveLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="font-mono text-base font-bold leading-4 text-foreground">
          {changePasswordTitle}
        </h2>
        <ul className="flex flex-col gap-6">{passwordFieldElements}</ul>
      </div>

      {formErrorElement}

      <Button
        className="flex h-10 w-[131px] items-center justify-center rounded-sm bg-primary font-mono text-base font-bold leading-4 text-ink"
        type="button"
        onClick={onSaveClick}
      >
        {saveLabel}
      </Button>
    </section>
  )
}
