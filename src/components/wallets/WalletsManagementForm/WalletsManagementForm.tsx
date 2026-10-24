import { FormFieldDisplay } from '@/components/forms/FormFieldDisplay/FormFieldDisplay'
import { Button } from '@/components/ui/button'
import type { WalletsManagementFormProps } from '@/types/wallets'

export function WalletsManagementForm({
  primaryWalletTitle,
  addWalletLabel,
  primaryWalletDescription,
  fieldRows,
  saveWalletLabel,
  secondaryWalletTitle,
  secondaryWalletToggleLabel,
  secondaryWalletAddLabel,
  secondaryWalletEmptyLabel,
  formErrorMessage,
  secondaryStatusLabel,
  secondaryFieldRows = [],
  onSaveWalletClick,
  onAddSecondaryWalletClick,
  onSaveSecondaryWalletClick,
}: WalletsManagementFormProps) {
  const fieldRowElements = fieldRows.map((rowFields, rowIndex) => {
    const rowKey = `row-${rowIndex}`
    const columnElements = rowFields.map((field, fieldIndex) => {
      const fieldKey = `${rowKey}-field-${fieldIndex}`

      return (
        <li key={fieldKey} className="flex-1">
          <FormFieldDisplay {...field} />
        </li>
      )
    })

    return (
      <ul className="flex gap-7" key={rowKey}>
        {columnElements}
      </ul>
    )
  })

  const secondaryFieldElements = secondaryFieldRows.map((rowFields, rowIndex) => {
    const rowKey = `secondary-row-${rowIndex}`
    const columnElements = rowFields.map((field, fieldIndex) => {
      const fieldKey = `${rowKey}-field-${fieldIndex}`

      return (
        <li key={fieldKey} className="flex-1">
          <FormFieldDisplay {...field} />
        </li>
      )
    })

    return (
      <ul className="flex gap-7" key={rowKey}>
        {columnElements}
      </ul>
    )
  })
  const hasSecondaryFields = secondaryFieldRows.length > 0
  const secondaryFieldsElement = hasSecondaryFields ? (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">{secondaryFieldElements}</div>
      <button
        className="flex h-10 w-[180px] cursor-pointer items-center justify-center rounded-sm bg-primary font-mono text-base font-bold leading-4 text-ink"
        type="button"
        onClick={onSaveSecondaryWalletClick}
      >
        Salvar secundária
      </button>
    </div>
  ) : null
  const secondaryStatus = secondaryStatusLabel ?? secondaryWalletEmptyLabel
  const hasFormError = formErrorMessage !== undefined && formErrorMessage.length > 0
  const formErrorElement = hasFormError ? (
    <p className="font-mono text-sm leading-5 text-text-accent" role="alert">
      {formErrorMessage}
    </p>
  ) : null

  return (
    <section className="flex w-full min-w-0 max-w-[862px] flex-1 flex-col gap-10">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-base font-bold leading-4 text-foreground">
            {primaryWalletTitle}
          </h2>
          <button
            className="cursor-pointer font-mono text-base leading-4 text-text-accent"
            type="button"
            onClick={onAddSecondaryWalletClick}
          >
            {addWalletLabel}
          </button>
        </div>
        <p className="font-mono text-[15px] leading-[15px] text-secondary">
          {primaryWalletDescription}
        </p>
      </header>

      <div className="flex flex-col gap-6">{fieldRowElements}</div>

      {formErrorElement}

      <Button
        className="flex h-10 w-[131px] items-center justify-center rounded-sm bg-primary font-mono text-base font-bold leading-4 text-ink"
        type="button"
        onClick={onSaveWalletClick}
      >
        {saveWalletLabel}
      </Button>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-base font-bold leading-4 text-foreground">
            {secondaryWalletTitle}
          </h3>
          <div className="flex items-center gap-6">
            <span className="font-mono text-base text-foreground">{secondaryWalletToggleLabel}</span>
            <Button
              className="cursor-pointer font-mono text-base text-text-accent"
              type="button"
              onClick={onAddSecondaryWalletClick}
            >
              {secondaryWalletAddLabel}
            </Button>
          </div>
        </div>
        <p className="font-mono text-[15px] text-secondary">{secondaryStatus}</p>
        {secondaryFieldsElement}
      </div>
    </section>
  )
}
