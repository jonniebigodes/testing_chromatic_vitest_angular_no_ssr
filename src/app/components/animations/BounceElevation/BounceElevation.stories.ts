import type { Meta, StoryObj } from '@storybook/angular';
import { BounceElevation } from './ui-bounce-elevation';

const meta: Meta<BounceElevation> = {
  title: 'Animations/BounceElevation',
  component: BounceElevation,
};

export default meta;
type Story = StoryObj<BounceElevation>;

export const Default: Story = {};

export const HigherLift: Story = {
  args: { liftPx: 52, cycleMs: 1800 },
};
