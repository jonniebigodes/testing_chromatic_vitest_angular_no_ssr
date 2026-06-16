import type { Meta, StoryObj } from '@storybook/angular';
import { Form } from './ui-form';

const meta: Meta<Form> = {
  title: 'Components/Form/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<Form>;

export const Default: Story = {
  render: () => ({
    template: `
      <ui-form>
        <label for="name">Full Name</label>
        <input id="name" type="text" class="input" placeholder="John Doe" />
      </ui-form>
    `,
    moduleMetadata: { imports: [Form] },
  }),
};

export const Inverted: Story = {
  render: () => ({
    template: `
      <div style="background: #1e293b; padding: 1rem;">
        <ui-form [inverted]="true">
          <label for="name-inv" class="label label--inverted">Full Name</label>
          <input id="name-inv" type="text" class="input input--inverted" placeholder="John Doe" />
        </ui-form>
      </div>
    `,
    moduleMetadata: { imports: [Form] },
  }),
  globals: {
    backgrounds: { value: 'dark' },
  },
};
