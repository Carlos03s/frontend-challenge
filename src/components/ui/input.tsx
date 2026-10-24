import { cva, type VariantProps } from 'class-variance-authority'
import type { InputHTMLAttributes, Ref } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'

const inputVariants = cva('', {
  variants: {
    variant: {
      default:
        'flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 font-mono text-sm text-foreground outline-none placeholder:text-secondary',
      bare: '',
    },
  },
  defaultVariants: {
    variant: 'bare',
  },
})

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    ref?: Ref<HTMLInputElement>
  }

export function Input({ className, variant, type, ref, ...props }: InputProps) {
  const inputClassName = mergeClassNames(inputVariants({ variant }), className)

  return <input ref={ref} className={inputClassName} type={type} {...props} />
}
