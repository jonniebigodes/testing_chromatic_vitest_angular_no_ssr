import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './ui-button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    label: { control: 'text' },
    clicked: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<Button>;

export const Default: Story = {
  args: { label: 'Click me', backgroundColor: '#3b82f6', size: 'medium' },
};
export const CustomBackgroundColor: Story = {
  args: { label: 'Red Button', backgroundColor: '#ef4444', size: 'medium' },
};
export const GreenButton: Story = {
  args: { label: 'Green Button', backgroundColor: '#10b981', size: 'medium' },
};
export const Small: Story = {
  args: { label: 'Small Button', backgroundColor: '#3b82f6', size: 'small' },
};
export const Medium: Story = {
  args: { label: 'Medium Button', backgroundColor: '#3b82f6', size: 'medium' },
};
export const Large: Story = {
  args: { label: 'Large Button', backgroundColor: '#3b82f6', size: 'large' },
};
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <ui-button label="Small" size="small" backgroundColor="#3b82f6"></ui-button>
        <ui-button label="Medium" size="medium" backgroundColor="#3b82f6"></ui-button>
        <ui-button label="Large" size="large" backgroundColor="#3b82f6"></ui-button>
      </div>
    `,
    moduleMetadata: { imports: [Button] },
  }),
};
export const WithClickHandler: Story = {
  args: { label: 'Click to Alert', backgroundColor: '#8b5cf6', size: 'medium' },
};
