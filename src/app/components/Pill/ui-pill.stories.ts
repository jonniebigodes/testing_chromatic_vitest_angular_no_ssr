import type { Meta, StoryObj } from '@storybook/angular';
import { Pill } from './ui-pill';

const meta: Meta<Pill> = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    content: 'Label',
    variant: 'default',
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    clicked: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<Pill>;

export const Default: Story = {};
export const Success: Story = { args: { variant: 'success', content: 'Done' } };
export const Warning: Story = { args: { variant: 'warning', content: 'Caution' } };
export const Inverted: Story = { args: { variant: 'inverted', content: 'Inverted' } };
export const Small: Story = { args: { size: 'small', content: 'Small' } };
export const Medium: Story = { args: { size: 'medium', content: 'Medium' } };
export const Large: Story = { args: { size: 'large', content: 'Large' } };
export const Clickable: Story = { args: { content: 'Click me' } };
export const Disabled: Story = { args: { content: 'Disabled', disabled: true } };
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <ui-pill content="Default" variant="default"></ui-pill>
        <ui-pill content="Success" variant="success"></ui-pill>
        <ui-pill content="Warning" variant="warning"></ui-pill>
        <ui-pill content="Inverted" variant="inverted"></ui-pill>
      </div>
    `,
    moduleMetadata: { imports: [Pill] },
  }),
};
