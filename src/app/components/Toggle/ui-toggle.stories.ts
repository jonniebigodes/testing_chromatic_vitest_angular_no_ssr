import type { Meta, StoryObj } from '@storybook/angular';
import { Toggle } from './ui-toggle';

const meta: Meta<Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    pressedChange: { action: 'pressedChange' },
  },
};
export default meta;
type Story = StoryObj<Toggle>;

export const Default: Story = {
  args: { label: 'Dark mode' },
};

export const Pressed: Story = {
  args: { label: 'Enabled', pressed: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};
