import type { Meta, StoryObj } from '@storybook/angular';
import { LoadingPulseDots } from './ui-loading-pulse-dots';

const meta: Meta<LoadingPulseDots> = {
  title: 'Animations/LoadingPulseDots',
  component: LoadingPulseDots,
};

export default meta;
type Story = StoryObj<LoadingPulseDots>;

export const Default: Story = {};

export const Compact: Story = {
  args: { dotCount: 7, cycleMs: 1000, color: '#0d9488' },
};
