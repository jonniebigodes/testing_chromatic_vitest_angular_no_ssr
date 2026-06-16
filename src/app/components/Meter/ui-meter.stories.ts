import type { Meta, StoryObj } from '@storybook/angular';
import { Meter } from './ui-meter';

const meta: Meta<Meter> = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  render: (args) => ({
    props: args,
    template: `<div style="width: 300px"><ui-meter [value]="value" [min]="min" [max]="max" [optimum]="optimum" [low]="low" [high]="high" [label]="label"></ui-meter></div>`,
    moduleMetadata: { imports: [Meter] },
  }),
};
export default meta;

type Story = StoryObj<Meter>;

export const Default: Story = { args: { value: 50, label: 'Storage' } };
export const High: Story = { args: { value: 80, label: 'Performance' } };
export const Low: Story = { args: { value: 20, label: 'Battery' } };
export const Critical: Story = { args: { value: 5, label: 'Critical' } };
export const WithThresholds: Story = {
  args: { value: 70, label: 'Score', low: 30, high: 70, optimum: 100 },
};
