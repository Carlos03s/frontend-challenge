import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeHeader } from '@/components/home/HomeHeader/HomeHeader'
import {
  homeHeaderCartIconSrc,
  homeHeaderLoginIconSrc,
  homeHeaderSearchIconSrc,
  homeHeaderStoryNavItemsInicioActive,
} from '@/consts/homeHeaderStoryNavItems'
import {
  homeHeroDesktopFeaturedImageSrc,
  homeHeroDesktopStorySlideIndicators,
} from '@/consts/homeHeroDesktopStoryContent'
import { HomeHeroDesktop } from '@/components/home/HomeHeroDesktop/HomeHeroDesktop'

const meta = {
  title: 'Home/HomeHeroDesktop',
  component: HomeHeroDesktop,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    eyebrowLabel: 'Bem-vindo à Kurio',
    titleLineOne: 'SEJA DONO DO FUTURO',
    titleLineTwo: 'DA ARTE DIGITAL',
    description:
      'Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.',
    ctaLabel: 'EXPLORAR',
    ctaHref: '/mercado',
    featuredImageSrc: homeHeroDesktopFeaturedImageSrc,
    featuredImageAlt: 'Ilustração de colecionável digital em destaque na Kurio',
    slideIndicators: homeHeroDesktopStorySlideIndicators,
    slideIndicatorsAriaLabel: 'Slides do destaque',
  },
} satisfies Meta<typeof HomeHeroDesktop>

export default meta

type Story = StoryObj<typeof meta>

export const DesktopFrame137: Story = {}

export const WithHeaderLikeInicio: Story = {
  render: (args) => {
    const headerElement = (
      <HomeHeader
        brandTo="/"
        brandLabel="KURIO"
        cartAriaLabel="Carrinho, 6 itens"
        cartCountLabel="6"
        cartIconSrc={homeHeaderCartIconSrc}
        loginAriaLabel="Entrar na conta"
        loginTo="/login"
        loginIconSrc={homeHeaderLoginIconSrc}
        loginLabel="Entrar"
        navItems={homeHeaderStoryNavItemsInicioActive}
        searchAriaLabel="Buscar"
        searchIconSrc={homeHeaderSearchIconSrc}
      />
    )
    const heroElement = <HomeHeroDesktop {...args} />
    const pageContent = (
      <div className="bg-background">
        {headerElement}
        {heroElement}
      </div>
    )

    return pageContent
  },
}
