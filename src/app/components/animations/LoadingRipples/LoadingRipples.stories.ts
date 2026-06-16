import type { Meta, StoryObj } from '@storybook/angular';
import { LoadingRipples } from './ui-loading-ripples';

const meta: Meta<LoadingRipples> = {
  title: 'Animations/LoadingRipples',
  component: LoadingRipples,
};

export default meta;
type Story = StoryObj<LoadingRipples>;

export const Default: Story = {};

export const WarmTone: Story = {
  args: { color: '#ea580c', ringCount: 4, cycleMs: 3000 },
};
