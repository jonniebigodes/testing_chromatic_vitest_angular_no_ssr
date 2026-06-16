import type { Meta, StoryObj } from '@storybook/angular';
import { FillTextLoading } from './ui-fill-text-loading';

const meta: Meta<FillTextLoading> = {
  title: 'Animations/FillTextLoading',
  component: FillTextLoading,
};

export default meta;
type Story = StoryObj<FillTextLoading>;

export const Default: Story = {};

export const LongLabel: Story = {
  args: { label: 'Synchronizing', cycleMs: 3000 },
};
