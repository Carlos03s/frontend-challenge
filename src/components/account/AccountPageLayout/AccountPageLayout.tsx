import { AccountSidebar } from '@/components/account/AccountSidebar/AccountSidebar'
import type { AccountSidebarProps } from '@/types/account'
import type { ReactNode } from 'react'

export type AccountPageLayoutProps = {
  sidebarProps: AccountSidebarProps
  contentElement: ReactNode
}

export function AccountPageLayout({ sidebarProps, contentElement }: AccountPageLayoutProps) {
  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row">
      <AccountSidebar {...sidebarProps} />
      {contentElement}
    </div>
  )
}
