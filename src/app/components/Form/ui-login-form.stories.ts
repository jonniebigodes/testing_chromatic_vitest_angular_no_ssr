import type { Meta, StoryObj } from '@storybook/angular';
import { LoginForm } from './ui-login-form';

const meta: Meta<LoginForm> = {
  title: 'Components/Form/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    loginClick: { action: 'loginClick' },
  },
};
export default meta;

type Story = StoryObj<LoginForm>;

export const Default: Story = {};

export const Inverted: Story = {
  render: () => ({
    template: `
      <div style="background: #1e293b; padding: 2rem;">
        <ui-login-form [inverted]="true"></ui-login-form>
      </div>
    `,
    moduleMetadata: { imports: [LoginForm] },
  }),
  globals: {
    backgrounds: { value: 'dark' },
  },
};
