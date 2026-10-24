import type { AccountNavItem, AccountSidebarProps } from '@/types/account'

const accountNavDefinitions: Omit<AccountNavItem, 'isActive'>[] = [
  { id: 'profile', label: 'Dados do perfil', to: '/perfil' },
  { id: 'wallets', label: 'Carteiras', to: '/carteiras' },
  { id: 'activity', label: 'Atividade', isDisabled: true },
  { id: 'wishlist', label: 'Lista de interesse', isDisabled: true },
  { id: 'offers', label: 'Ofertas', isDisabled: true },
  { id: 'downloads', label: 'Arquivos baixados', isDisabled: true },
  { id: 'support', label: 'Suporte', isDisabled: true },
  { id: 'logout', label: 'Sair', action: 'logout' },
]

export function buildAccountSidebarProps(activeItemId: string): AccountSidebarProps {
  const navItems = accountNavDefinitions.map((definition) => ({
    ...definition,
    isActive: definition.id === activeItemId,
  }))

  return {
    sectionTitle: 'Minha conta',
    navItems,
  }
}
