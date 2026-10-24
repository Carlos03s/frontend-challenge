import type { HTMLAttributes } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={mergeClassNames('animate-pulse rounded-md bg-surface-card', className)}
      {...props}
    />
  )
}
