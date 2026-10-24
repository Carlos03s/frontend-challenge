import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { HomeFooter } from '@/components/home/HomeFooter/HomeFooter'
import {
  homeFooterStoryFeatures,
  homeFooterStoryLinkColumns,
  homeFooterStorySocialLinks,
} from '@/consts/homeFooterStoryContent'

const meta = {
  title: 'Home/Footer/HomeFooter',
  component: HomeFooter,
  parameters: {
    layout: 'centered',
  },
  args: {
    features: homeFooterStoryFeatures,
    newsletterTitle: 'Antecipe-se ao próximo lançamento',
    newsletterPlaceholder: 'digite seu e-mail...',
    newsletterSubmitLabel: 'Enviar',
    newsletterDescription:
      'Receba lançamentos selecionados, histórias de criadores e novidades do mercado.',
    brandLabel: 'KURIO',
    brandDescriptionLineOne: 'Feito para colecionadores,',
    brandDescriptionLineTwo: 'criadores e cultura',
    contactEmailLabel: 'contato@email.com',
    contactEmailHref: 'mailto:contato@email.com',
    phoneLabel: '+55 11 4002 8922',
    linkColumns: homeFooterStoryLinkColumns,
    socialSectionTitle: 'Redes sociais',
    socialLinks: homeFooterStorySocialLinks,
    walletSectionTitle: 'Carteiras compatíveis',
    walletsLabel: 'METAMASK  •  WALLETCONNECT  •  COINBASE',
    copyrightLabel: '© 2026 Kurio. Propriedade digital para todos.',
    onNewsletterSubmit: fn(),
  },
} satisfies Meta<typeof HomeFooter>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
