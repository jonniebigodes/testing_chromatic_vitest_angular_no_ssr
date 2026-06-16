import type { Meta, StoryObj } from '@storybook/angular';
import { RotationLoop } from './ui-rotation-loop';

const meta: Meta<RotationLoop> = {
  title: 'Animations/RotationLoop',
  component: RotationLoop,
};

export default meta;
type Story = StoryObj<RotationLoop>;

export const Default: Story = {};

export const Slower: Story = {
  args: { durationMs: 6000 },
};
