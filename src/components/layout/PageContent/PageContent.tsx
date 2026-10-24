import type { ReactNode } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'

export type PageContentProps = {
  children: ReactNode
  className?: string
}

export function PageContent({ children, className }: PageContentProps) {
  const contentClassName = mergeClassNames(
    'mx-auto flex w-full max-w-[1200px] flex-col',
    className,
  )

  return <div className={contentClassName}>{children}</div>
}
