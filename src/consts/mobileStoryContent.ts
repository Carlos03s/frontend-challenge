import type {
  MobileAuthFormProps,
  MobileCheckoutPanelProps,
  MobileHeroBannerProps,
  MobileNftDetailPanelProps,
  MobileSearchBarProps,
  MobileTabBarProps,
} from '@/types/mobile'
import { buildMobileTabBarProps } from '@/utils/buildMobileTabBarProps'

const mobileSearchIconSrc = '/assets/home/figma/search.svg'
const mobileArrowIconSrc = '/assets/home/figma/arrow-right.svg'

const noopHandler = () => {}

export const mobileStorySearchBarProps: MobileSearchBarProps = {
  placeholder: 'Explorar coleções',
  searchIconSrc: mobileSearchIconSrc,
  filterAriaLabel: 'Abrir filtros',
  filterIconSrc: mobileSearchIconSrc,
}

export const mobileStoryHeroBannerProps: MobileHeroBannerProps = {
  eyebrowLabel: 'Bem-vindo à Kurio',
  titleLineOne: 'SEJA DONO DA',
  titleLineTwo: 'CULTURA DIGITAL',
  description: 'Descubra NFTs selecionados de criadores do mundo todo.',
  ctaLabel: 'EXPLORAR',
  ctaArrowIconSrc: mobileArrowIconSrc,
  featuredImageSrc: '/assets/home/figma/ape-green.webp',
  featuredImageAlt: 'Emerald Ape em destaque',
  accentImageSrc: '/assets/home/figma/ape-purple.webp',
  accentImageAlt: 'Sage Nomad em destaque',
}

export const mobileStoryTabBarProps: MobileTabBarProps = buildMobileTabBarProps('home', '2', {
  onHomeClick: noopHandler,
  onFavoritesClick: noopHandler,
  onCartClick: noopHandler,
  onProfileClick: noopHandler,
  onCenterActionClick: noopHandler,
})

export const mobileStoryNftDetailPanelProps: MobileNftDetailPanelProps = {
  title: 'Emerald Ape #042',
  priceLabel: '1.19 ETH',
  editionLabel: 'Edição: 1/50',
  description:
    'Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.',
  buyLabel: 'COMPRAR',
  favoriteLabel: 'Favoritar',
}

export const mobileStoryCheckoutPanelProps: MobileCheckoutPanelProps = {
  breadcrumbLabel: 'Início / Mercado / Pagamento',
  collectorTitle: 'Perfil do colecionador',
  emailPlaceholder: 'contato@email.com',
  networkPlaceholder: 'Selecione uma rede',
  walletPlaceholder: 'Selecione uma carteira',
  selectArrowIconSrc: '/assets/checkout/figma/arrow-down.svg',
  walletOptions: [
    { id: 'mm', label: 'MetaMask', markLabel: 'M', isSelected: true },
    { id: 'wc', label: 'WalletConnect', markLabel: 'W', isSelected: false },
    { id: 'cb', label: 'Coinbase Wallet', markLabel: 'C', isSelected: false },
  ],
  totalPrefixLabel: 'Total:',
  totalValueLabel: '26.846 ETH',
  confirmLabel: 'Confirmar compra',
}

export const mobileStorySignInProps: MobileAuthFormProps = {
  brandLabel: 'KURIO',
  title: 'Entrar',
  fields: ['contato@email.com', '***********'],
  forgotPasswordLabel: 'Esqueceu a senha?',
  submitLabel: 'Entrar',
  footerLinkLabel: 'Criar conta',
  footerLinkHref: '#',
  passwordToggleIconSrc: '/assets/auth/figma/hide.svg',
  socialDividerLabel: 'Ou continue com',
  socialButtons: [
    {
      id: 'google',
      label: 'Continuar com Google',
      iconSrc: '/assets/auth/figma/google.svg',
    },
    {
      id: 'facebook',
      label: 'Continuar com Facebook',
      iconSrc: '/assets/auth/figma/facebook.svg',
    },
  ],
}

export const mobileStorySignUpProps: MobileAuthFormProps = {
  brandLabel: 'KURIO',
  title: 'Criar conta',
  fields: ['Nome de usuário', 'Digite seu e-mail', 'Senha', 'Confirmar senha'],
  submitLabel: 'Criar conta',
  footerLinkLabel: 'Entrar',
  footerLinkHref: '#',
  passwordToggleIconSrc: '/assets/auth/figma/hide.svg',
  socialDividerLabel: 'Ou continue com',
  socialButtons: [
    {
      id: 'google',
      label: 'Continuar com Google',
      iconSrc: '/assets/auth/figma/google.svg',
    },
    {
      id: 'facebook',
      label: 'Continuar com Facebook',
      iconSrc: '/assets/auth/figma/facebook.svg',
    },
  ],
}
