export type FormFieldDisplayProps = {
  label: string
  isRequired: boolean
  valueLabel: string
  selectArrowIconSrc?: string
  isMultiline?: boolean
  onValueChange?: (value: string) => void
  errorMessage?: string
}
