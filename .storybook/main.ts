import type { StorybookConfig } from '@storybook/react-vite'

const storybookConfig: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default storybookConfig
