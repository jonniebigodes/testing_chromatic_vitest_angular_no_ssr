import type { Meta, StoryObj } from '@storybook/angular';
import { ScrambleTextReveal } from './ui-scramble-text-reveal';

const meta: Meta<ScrambleTextReveal> = {
  title: 'Animations/ScrambleTextReveal',
  component: ScrambleTextReveal,
};

export default meta;
type Story = StoryObj<ScrambleTextReveal>;

export const Default: Story = {};

export const StatusLabels: Story = {
  args: { words: ['Idle', 'Fetching', 'Ready'], wordHoldMs: 2800, scrambleTickMs: 40 },
};
