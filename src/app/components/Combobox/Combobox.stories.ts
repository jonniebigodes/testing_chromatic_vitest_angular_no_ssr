import type { Meta, StoryObj } from '@storybook/angular';
import { Combobox } from './ui-combobox';

const meta: Meta<Combobox> = {
  title: 'Combobox',
  component: Combobox,
  argTypes: {
    valueChange: { action: 'valueChange' },
    openChange: { action: 'openChange' }
  }
};
export default meta;

type Story = StoryObj<Combobox>;

const frameworks = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Lit'];

export const Default: Story = {
  args: { items: frameworks, label: 'Framework', placeholder: 'Search frameworks...' }
};

export const WithPlaceholder: Story = {
  args: { items: frameworks, placeholder: 'Choose one...' }
};

export const Disabled: Story = {
  args: { items: frameworks, label: 'Framework', disabled: true }
};

export const MultipleSelection: Story = {
  args: { type: 'multiple', items: frameworks, label: 'Frameworks' }
};
