import type { Meta, StoryObj } from '@storybook/react-vite'

import { FormFieldDisplay } from '@/components/forms/FormFieldDisplay/FormFieldDisplay'

const meta = {
  title: 'Forms/FormFieldDisplay',
  component: FormFieldDisplay,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ink',
      values: [{ name: 'ink', value: '#140D0A' }],
    },
  },
  args: {
    label: 'Nome de exibição',
    isRequired: true,
    valueLabel: '',
  },
} satisfies Meta<typeof FormFieldDisplay>

export default meta

type Story = StoryObj<typeof meta>

export const TextField: Story = {}

export const SelectField: Story = {
  args: {
    label: 'Rede',
    isRequired: true,
    valueLabel: 'Selecione uma rede',
    selectArrowIconSrc: '/assets/checkout/figma/arrow-down.svg',
  },
}

export const MultilineField: Story = {
  args: {
    label: 'Observação do colecionador (opcional)',
    isRequired: false,
    valueLabel: '',
    isMultiline: true,
  },
}
