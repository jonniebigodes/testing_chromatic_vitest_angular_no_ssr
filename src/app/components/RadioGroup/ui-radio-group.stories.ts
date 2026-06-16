import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroup } from './ui-radio-group';

const meta: Meta<RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    valueChange: { action: 'valueChange' },
  },
};
export default meta;
type Story = StoryObj<RadioGroup>;

const options = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

export const Default: Story = {
  args: { options, label: 'Pick a size' },
};

export const Horizontal: Story = {
  args: { options, orientation: 'horizontal', label: 'Size' },
};

export const Disabled: Story = {
  args: { options, disabled: true, label: 'Size' },
};
