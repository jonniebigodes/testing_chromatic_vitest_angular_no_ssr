import type { Meta, StoryObj } from '@storybook/angular';
import { DatePicker } from './ui-date-picker';

const meta: Meta<DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {
    valueChange: { action: 'valueChange' },
    openChange: { action: 'openChange' }
  }
};
export default meta;

type Story = StoryObj<DatePicker>;

export const Default: Story = {
  args: { label: 'Departure date' }
};

export const NoLabel: Story = {};

export const Disabled: Story = {
  args: { label: 'Departure date', disabled: true }
};

export const MultipleSelection: Story = {
  args: { label: 'Select dates', type: 'multiple' }
};
