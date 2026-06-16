import type { Meta, StoryObj } from '@storybook/angular';
import { Label } from './ui-label';

const meta: Meta<Label> = {
  title: 'Components/Form/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<Label>;

export const Default: Story = {
  args: { htmlFor: 'email', content: 'Email Address' },
};

export const Inverted: Story = {
  render: () => ({
    template: `
      <div style="background: #1e293b; padding: 1rem;">
        <ui-label [inverted]="true" content="Dark mode label"></ui-label>
      </div>
    `,
    moduleMetadata: { imports: [Label] },
  }),
  globals: {
    backgrounds: { value: 'dark' },
  },
};
