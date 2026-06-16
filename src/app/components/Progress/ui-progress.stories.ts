import type { Meta, StoryObj } from '@storybook/angular';
import { Progress } from './ui-progress';

const meta: Meta<Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    min: 0,
    max: 100,
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 300px"><ui-progress [value]="value" [min]="min" [max]="max" [label]="label" [orientation]="orientation" [disabled]="disabled" [readonly]="readonly"></ui-progress></div>`,
    moduleMetadata: { imports: [Progress] },
  }),
};
export default meta;

type Story = StoryObj<Progress>;

export const Default: Story = { args: { value: 50, label: 'Loading' } };
export const NoLabel: Story = { args: { value: 75 } };
export const Full: Story = { args: { value: 100, label: 'Complete' } };
export const Empty: Story = { args: { value: 0, label: 'Starting' } };
export const Vertical: Story = {
  args: { value: 60, label: 'Uploading', orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `<div style="height: 200px"><ui-progress [value]="value" [label]="label" orientation="vertical"></ui-progress></div>`,
    moduleMetadata: { imports: [Progress] },
  }),
};
export const Disabled: Story = { args: { value: 40, label: 'Disabled', disabled: true } };
export const ReadOnly: Story = { args: { value: 80, label: 'Read-only', readonly: true } };
