import type { Meta, StoryObj } from '@storybook/angular';
import { BasicAnimation } from './ui-basic-animation';

const meta: Meta<BasicAnimation> = {
  title: 'Animations/BasicAnimation',
  component: BasicAnimation,
};

export default meta;
type Story = StoryObj<BasicAnimation>;

export const Default: Story = {};

export const CustomTick: Story = {
  args: { tickMs: 1000, widthMaxPx: 200 },
};
