import type { Meta, StoryObj } from '@storybook/angular';
import { Checkbox } from './ui-checkbox';

const meta: Meta<Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    checkedChange: { action: 'checkedChange' },
  },
};
export default meta;
type Story = StoryObj<Checkbox>;

export const Default: Story = {
  args: { label: 'Accept terms' },
};

export const Checked: Story = {
  args: { checked: true, label: 'Subscribed' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable' },
};
