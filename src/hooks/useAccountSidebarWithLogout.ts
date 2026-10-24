import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { logoutAccount } from '@/api/authApi'
import type { AccountSidebarProps } from '@/types/account'
import { buildAccountSidebarProps } from '@/utils/buildAccountSidebarProps'
import { clearPrivateSessionState } from '@/utils/clearPrivateSessionState'

export function useAccountSidebarWithLogout(activeItemId: string): AccountSidebarProps {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      clearPrivateSessionState(queryClient)
      void navigate({ to: '/' })
    },
    onError: () => {
      clearPrivateSessionState(queryClient)
      void navigate({ to: '/' })
    },
  })

  const sidebarProps = buildAccountSidebarProps(activeItemId)

  const handleLogoutClick = () => {
    logoutMutation.mutate()
  }

  return {
    ...sidebarProps,
    onLogoutClick: handleLogoutClick,
  }
}
