import type { ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FormFieldDisplayProps } from '@/types/form'

export function FormFieldDisplay({
  label,
  isRequired,
  valueLabel,
  selectArrowIconSrc,
  isMultiline,
  onValueChange,
  errorMessage,
}: FormFieldDisplayProps) {
  const hasSelectArrow = selectArrowIconSrc !== undefined
  const fieldHeightClassName = isMultiline ? 'h-[152px] items-start py-3' : 'h-10 items-center'
  const fieldClassName = `flex w-full rounded-sm border border-border px-3 font-mono text-sm leading-[15px] text-secondary ${fieldHeightClassName}`

  const requiredMarkElement = isRequired ? (
    <span className="font-mono text-[22px] leading-[29px] text-[#F0805F]">*</span>
  ) : null

  const selectArrowElement = hasSelectArrow ? (
    <img alt="" className="size-[18px] shrink-0" src={selectArrowIconSrc} />
  ) : null

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value)
  }

  const isEditable = onValueChange !== undefined && !hasSelectArrow
  const hasErrorMessage = errorMessage !== undefined && errorMessage.length > 0

  const editableFieldElement = isMultiline ? (
    <span>{valueLabel}</span>
  ) : (
    <Input
      aria-label={label}
      className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-secondary"
      value={valueLabel}
      onChange={handleInputChange}
    />
  )

  let fieldContentElement = <span>{valueLabel}</span>

  if (hasSelectArrow) {
    fieldContentElement = (
      <div className="flex w-full items-center justify-between">
        <span>{valueLabel}</span>
        {selectArrowElement}
      </div>
    )
  }

  if (isEditable) {
    fieldContentElement = editableFieldElement
  }

  const errorElement = hasErrorMessage ? (
    <p className="font-mono text-xs leading-4 text-text-accent">{errorMessage}</p>
  ) : null

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-1">
        <Label className="font-mono text-[15px] leading-[15px] text-foreground">{label}</Label>
        {requiredMarkElement}
      </div>
      <div className={fieldClassName}>{fieldContentElement}</div>
      {errorElement}
    </div>
  )
}
