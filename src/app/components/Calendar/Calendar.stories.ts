import type { Meta, StoryObj } from '@storybook/angular';
import { CalendarDate } from '@internationalized/date';
import { Calendar } from './ui-calendar';

const meta: Meta<Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    valueChange: { action: 'valueChange' }
  }
};
export default meta;

type Story = StoryObj<Calendar>;

export const Default: Story = {};

export const WithPreselectedDate: Story = {
  args: {
    value: [new CalendarDate(2024, 1, 15)],
    heading: 'Pick a date',
  }
};

export const MultipleSelection: Story = {
  args: {
    type: 'multiple',
    value: [new CalendarDate(2024, 6, 3), new CalendarDate(2024, 6, 10)],
  }
};

export const Disabled: Story = {
  args: { disabled: true }
};
