import { AccountPageLayout } from '@/components/account/AccountPageLayout/AccountPageLayout'
import { WalletsManagementForm } from '@/components/wallets/WalletsManagementForm/WalletsManagementForm'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import { accountStorySidebarWalletsActive } from '@/consts/accountStoryContent'
import { walletsStoryManagementFormProps } from '@/consts/walletsStoryContent'

export function AccountWalletsDesktopReference() {
  const breadcrumbElement = <PageBreadcrumb label="Início / Meu perfil / Carteiras" />

  const walletsFormElement = <WalletsManagementForm {...walletsStoryManagementFormProps} />

  const layoutElement = (
    <AccountPageLayout contentElement={walletsFormElement} sidebarProps={accountStorySidebarWalletsActive} />
  )

  return (
    <div className="flex w-[1200px] flex-col gap-8">
      {breadcrumbElement}
      {layoutElement}
    </div>
  )
}
