import type { Preview } from '@storybook/react-vite'

import { StorybookRouterDecorator } from './routerDecorator'
import '../src/styles/globals.css'

const preview: Preview = {
  decorators: [StorybookRouterDecorator],
  parameters: {
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile',
          styles: { width: '390px', height: '844px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
  },
}

export default preview
