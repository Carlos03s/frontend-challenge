import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { mergeClassNames } from '@/utils/mergeClassNames'

export type AppLinkProps = {
  to: string
  search?: Record<string, unknown>
  className?: string
  children: ReactNode
  ariaLabel?: string
}

export function AppLink({ to, search, className, children, ariaLabel }: AppLinkProps) {
  const linkClassName = mergeClassNames(
    'cursor-pointer transition-colors duration-150 ease-out',
    className,
  )

  return (
    <Link aria-label={ariaLabel} className={linkClassName} search={search} to={to}>
      {children}
    </Link>
  )
}
