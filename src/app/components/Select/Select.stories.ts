import type { Meta, StoryObj } from '@storybook/angular';
import { Select } from './ui-select';

const meta: Meta<Select> = {
  title: 'Select',
  component: Select,
  argTypes: {
    valueChange: { action: 'valueChange' },
    openChange: { action: 'openChange' }
  }
};
export default meta;

type Story = StoryObj<Select>;

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

export const Default: Story = {
  args: { items: fruits, label: 'Fruit', placeholder: 'Choose a fruit' }
};

export const WithPlaceholder: Story = {
  args: { items: fruits, placeholder: 'Choose a fruit' }
};

export const Disabled: Story = {
  args: { items: fruits, label: 'Fruit', disabled: true }
};

export const MultipleSelection: Story = {
  args: { type: 'multiple', items: fruits, label: 'Fruits' }
};
