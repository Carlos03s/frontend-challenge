import type { AccountSidebarProps } from '@/types/account'
import { buildAccountSidebarProps } from '@/utils/buildAccountSidebarProps'

export const accountStorySidebarProfileActive: AccountSidebarProps =
  buildAccountSidebarProps('profile')

export const accountStorySidebarWalletsActive: AccountSidebarProps =
  buildAccountSidebarProps('wallets')
