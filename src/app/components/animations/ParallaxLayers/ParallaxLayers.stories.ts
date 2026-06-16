import type { Meta, StoryObj } from '@storybook/angular';
import { ParallaxLayers } from './ui-parallax-layers';

const meta: Meta<ParallaxLayers> = {
  title: 'Animations/ParallaxLayers',
  component: ParallaxLayers,
};

export default meta;
type Story = StoryObj<ParallaxLayers>;

export const Horizontal: Story = {
  args: { axis: 'horizontal' },
};

export const Vertical: Story = {
  args: { axis: 'vertical', durationMs: 4200 },
};
