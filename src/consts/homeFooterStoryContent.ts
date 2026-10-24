import type {
  HomeFooterFeature,
  HomeFooterLinkColumn,
  HomeFooterSocialLink,
} from '@/types/homeFooter'

export const homeFooterStoryFeatures: HomeFooterFeature[] = [
  {
    id: 'wallet-security',
    medallionLabel: 'W',
    title: 'Segurança da carteira',
    description: 'Proteja sua carteira e colecione arte digital verificada com confiança.',
  },
  {
    id: 'featured-creators',
    medallionLabel: 'C',
    title: 'Criadores em destaque',
    description: 'Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.',
  },
  {
    id: 'launch-alerts',
    medallionLabel: 'D',
    title: 'Alertas de lançamentos',
    description: 'Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.',
  },
]

export const homeFooterStoryLinkColumns: HomeFooterLinkColumn[] = [
  {
    id: 'profile',
    title: 'Meu perfil',
    links: [
      { id: 'profile-link', label: 'Meu perfil', href: '#' },
      { id: 'collection-link', label: 'Minha coleção', href: '#' },
      { id: 'activity-link', label: 'Atividade', href: '#' },
      { id: 'studio-link', label: 'Estúdio do criador', href: '#' },
      { id: 'watchlist-link', label: 'Lista de interesse', href: '#' },
    ],
  },
  {
    id: 'help',
    title: 'Central de ajuda',
    links: [
      { id: 'help-link', label: 'Central de ajuda', href: '#' },
      { id: 'buy-link', label: 'Como comprar NFTs', href: '#' },
      { id: 'security-link', label: 'Carteira e segurança', href: '#' },
      { id: 'policy-link', label: 'Política do mercado', href: '#' },
      { id: 'report-link', label: 'Denunciar item', href: '#' },
    ],
  },
  {
    id: 'collections',
    title: 'Coleções',
    links: [
      { id: 'digital-art-link', label: 'Arte digital', href: '#' },
      { id: 'photography-link', label: 'Fotografia', href: '#' },
      { id: 'music-link', label: 'Música', href: '#' },
      { id: 'art-3d-link', label: 'Arte 3D', href: '#' },
      { id: 'utility-link', label: 'Utilidade', href: '#' },
    ],
  },
]

export const homeFooterStorySocialLinks: HomeFooterSocialLink[] = [
  {
    id: 'facebook',
    href: '#',
    ariaLabel: 'Facebook',
    iconSrc: '/assets/home/figma/facebook.svg',
  },
  {
    id: 'instagram',
    href: '#',
    ariaLabel: 'Instagram',
    iconSrc: '/assets/home/figma/instagram.svg',
  },
  {
    id: 'twitter',
    href: '#',
    ariaLabel: 'Twitter',
    iconSrc: '/assets/home/figma/twitter.svg',
  },
  {
    id: 'linkedin',
    href: '#',
    ariaLabel: 'LinkedIn',
    iconSrc: '/assets/home/figma/linkedin.svg',
  },
  {
    id: 'youtube',
    href: '#',
    ariaLabel: 'YouTube',
    iconSrc: '/assets/home/figma/youtube.svg',
  },
]
