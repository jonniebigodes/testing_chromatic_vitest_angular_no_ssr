import type { Meta, StoryObj } from '@storybook/angular';
import { KeyframeInterruptHover } from './ui-keyframe-interrupt-hover';

const meta: Meta<KeyframeInterruptHover> = {
  title: 'Animations/KeyframeInterruptHover',
  component: KeyframeInterruptHover,
};

export default meta;
type Story = StoryObj<KeyframeInterruptHover>;

export const Default: Story = {};

export const FasterInterrupts: Story = {
  args: { keyframeCycleMs: 1200, interruptCycleMs: 320 },
};
