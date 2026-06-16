import type { Meta, StoryObj } from '@storybook/angular';
import { ColorInterpolation } from './ui-color-interpolation';

const meta: Meta<ColorInterpolation> = {
  title: 'Animations/ColorInterpolation',
  component: ColorInterpolation,
};

export default meta;
type Story = StoryObj<ColorInterpolation>;

export const Default: Story = {};

export const SlowerSweep: Story = {
  args: { durationMs: 6000 },
};
