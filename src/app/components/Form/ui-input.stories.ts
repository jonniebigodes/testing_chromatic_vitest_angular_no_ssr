import type { Meta, StoryObj } from '@storybook/angular';
import { Input } from './ui-input';

const meta: Meta<Input> = {
  title: 'Components/Form/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<Input>;

export const Default: Story = {
  args: { placeholder: 'Enter your name' },
};

export const Inverted: Story = {
  render: () => ({
    template: `
      <div style="background: #1e293b; padding: 1rem;">
        <ui-input placeholder="Inverted input" [inverted]="true"></ui-input>
      </div>
    `,
    moduleMetadata: { imports: [Input] },
  }),
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter your password' },
};
