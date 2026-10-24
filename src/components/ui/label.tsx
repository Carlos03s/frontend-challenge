import { cva, type VariantProps } from 'class-variance-authority'
import type { LabelHTMLAttributes } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'

const labelVariants = cva('', {
  variants: {
    variant: {
      default: 'font-mono text-sm font-medium leading-none text-foreground',
      bare: '',
    },
  },
  defaultVariants: {
    variant: 'bare',
  },
})

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>

export function Label({ className, variant, ...props }: LabelProps) {
  const labelClassName = mergeClassNames(labelVariants({ variant }), className)

  return <label className={labelClassName} {...props} />
}
