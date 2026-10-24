import { MobileHeroBanner } from '@/components/mobile/MobileHeroBanner/MobileHeroBanner'
import { MobileSearchBar } from '@/components/mobile/MobileSearchBar/MobileSearchBar'
import { MobileTabBar } from '@/components/mobile/MobileTabBar/MobileTabBar'
import {
  mobileStoryHeroBannerProps,
  mobileStorySearchBarProps,
  mobileStoryTabBarProps,
} from '@/consts/mobileStoryContent'

export function MobileHomeReference() {
  const searchElement = <MobileSearchBar {...mobileStorySearchBarProps} />

  const heroElement = <MobileHeroBanner {...mobileStoryHeroBannerProps} />

  const tabBarElement = <MobileTabBar {...mobileStoryTabBarProps} />

  return (
    <div className="flex w-full max-w-[414px] flex-col gap-6 bg-background pb-0">
      {searchElement}
      {heroElement}
      <div className="flex-1" />
      {tabBarElement}
    </div>
  )
}
