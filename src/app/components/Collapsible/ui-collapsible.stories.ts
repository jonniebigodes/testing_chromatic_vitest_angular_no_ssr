import type { Meta, StoryObj } from '@storybook/angular';
import { Collapsible } from './ui-collapsible';

const meta: Meta<Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    openChange: { action: 'openChange' }
  }
};
export default meta;

type Story = StoryObj<Collapsible>;

export const Default: Story = {
  args: { label: 'Show details', body: 'Here is some hidden content.' }
};

export const Open: Story = {
  args: { label: 'Show details', open: true, body: 'This content is visible.' }
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true, body: "Can't see me." }
};
