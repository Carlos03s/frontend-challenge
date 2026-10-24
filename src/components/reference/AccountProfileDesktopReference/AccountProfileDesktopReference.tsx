import { AccountPageLayout } from '@/components/account/AccountPageLayout/AccountPageLayout'
import { ProfileDetailsForm } from '@/components/profile/ProfileDetailsForm/ProfileDetailsForm'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import { accountStorySidebarProfileActive } from '@/consts/accountStoryContent'
import { profileStoryDetailsFormProps } from '@/consts/profileStoryContent'

export function AccountProfileDesktopReference() {
  const breadcrumbElement = <PageBreadcrumb label="Início / Meu perfil / Dados do perfil" />

  const profileFormElement = <ProfileDetailsForm {...profileStoryDetailsFormProps} />

  const layoutElement = (
    <AccountPageLayout contentElement={profileFormElement} sidebarProps={accountStorySidebarProfileActive} />
  )

  return (
    <div className="flex w-[1200px] flex-col gap-8">
      {breadcrumbElement}
      {layoutElement}
    </div>
  )
}
