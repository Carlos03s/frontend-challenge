import type { PageBreadcrumbProps } from '@/types/layout'

export function PageBreadcrumb({ label }: PageBreadcrumbProps) {
  return (
    <p className="font-mono text-base font-normal leading-4 text-secondary">{label}</p>
  )
}
