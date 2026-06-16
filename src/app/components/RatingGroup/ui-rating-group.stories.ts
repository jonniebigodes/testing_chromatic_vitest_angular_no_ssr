import type { Meta, StoryObj } from '@storybook/angular';
import { RatingGroup } from './ui-rating-group';

const meta: Meta<RatingGroup> = {
  title: 'Components/RatingGroup',
  component: RatingGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    valueChange: { action: 'valueChange' },
  },
};
export default meta;
type Story = StoryObj<RatingGroup>;

export const Default: Story = {
  args: { min: 1, max: 5, label: 'Rate us' },
};

export const PreSelected: Story = {
  args: { min: 1, max: 5, value: 3, label: 'Your rating' },
};

export const Disabled: Story = {
  args: { min: 1, max: 5, value: 4, disabled: true },
};
