import type { Meta, StoryObj } from '@storybook/angular';
import { Divider } from './ui-divider';

const meta: Meta<Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<Divider>;

export const Default: Story = {};
export const CustomColor: Story = { args: { color: '#ef4444' } };
export const Inverted: Story = {
  args: { inverted: true },
  parameters: { backgrounds: { default: 'dark' } },
};
export const MultipleColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px">
        <ui-divider color="#ef4444"></ui-divider>
        <ui-divider color="#3b82f6"></ui-divider>
        <ui-divider color="#10b981"></ui-divider>
      </div>
    `,
    moduleMetadata: { imports: [Divider] },
  }),
};
