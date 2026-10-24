import type { HTMLAttributes } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  const isVertical = orientation === 'vertical'
  const orientationClassName = isVertical ? 'h-full w-px shrink-0 bg-border' : 'h-px w-full shrink-0 bg-border'
  const separatorClassName = mergeClassNames(orientationClassName, className)

  return <div aria-hidden className={separatorClassName} role="separator" {...props} />
}
