import { FormFieldDisplay } from '@/components/forms/FormFieldDisplay/FormFieldDisplay'
import type { CheckoutCollectorFormProps } from '@/types/checkout'

export function CheckoutCollectorForm({
  title,
  leftColumnFields,
  rightColumnFields,
  ensPrefixLabel,
  ensSelectArrowIconSrc,
  alternateWalletLabel,
  alternateWalletRadioIconSrc,
  noteTitle,
}: CheckoutCollectorFormProps) {
  const leftFieldElements = leftColumnFields.map((field, fieldIndex) => {
    const fieldKey = `left-${fieldIndex}`

    return (
      <li key={fieldKey}>
        <FormFieldDisplay {...field} />
      </li>
    )
  })

  const rightFieldElements = rightColumnFields.map((field, fieldIndex) => {
    const fieldKey = `right-${fieldIndex}`

    return (
      <li key={fieldKey}>
        <FormFieldDisplay {...field} />
      </li>
    )
  })

  const noteFieldElement = (
    <FormFieldDisplay isMultiline isRequired={false} label={noteTitle} valueLabel="" />
  )

  return (
    <section className="flex flex-1 flex-col gap-3">
      <h2 className="font-mono text-[17px] font-bold leading-4 text-foreground">{title}</h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <ul className="flex flex-1 flex-col gap-3">{leftFieldElements}</ul>
        <ul className="flex flex-1 flex-col gap-3">
          {rightFieldElements}
          <li>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <span className="font-mono text-[15px] leading-[15px] text-foreground">
                  Nome ENS
                </span>
                <span className="font-mono text-[22px] leading-[29px] text-[#F0805F]">*</span>
              </div>
              <div className="flex h-10 w-[78px] items-center justify-between rounded-sm border border-border px-2.5">
                <span className="font-mono text-[15px] text-foreground">{ensPrefixLabel}</span>
                <img alt="" className="size-[18px]" src={ensSelectArrowIconSrc} />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <img alt="" className="size-[15px]" src={alternateWalletRadioIconSrc} />
        <p className="font-mono text-[15px] text-foreground">{alternateWalletLabel}</p>
      </div>
      {noteFieldElement}
    </section>
  )
}
