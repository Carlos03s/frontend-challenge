import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, Ref } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-primary text-copper-foreground hover:bg-copper-hover',
      outline: 'border border-border bg-transparent hover:border-primary',
      ghost: 'hover:bg-surface-card',
      bare: '',
    },
    size: {
      default: 'h-9 px-4',
      sm: 'h-8 px-3',
      lg: 'h-10 px-6',
      bare: '',
    },
  },
  defaultVariants: {
    variant: 'bare',
    size: 'bare',
  },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    ref?: Ref<HTMLButtonElement>
  }

export function Button({ className, variant, size, ref, ...props }: ButtonProps) {
  const buttonClassName = mergeClassNames(buttonVariants({ variant, size }), className)

  return <button ref={ref} className={buttonClassName} {...props} />
}
