import type { Meta, StoryObj } from '@storybook/angular';
import { TimeField } from './ui-time-field';

const meta: Meta<TimeField> = {
  title: 'Components/Form/TimeField',
  component: TimeField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    valueChange: { action: 'valueChange' },
  },
};
export default meta;
type Story = StoryObj<TimeField>;

export const Default: Story = {
  args: { label: 'Start time' },
};

export const WithValue: Story = {
  args: { label: 'Appointment', value: '09:30' },
};

export const Disabled: Story = {
  args: { label: 'Time', value: '14:00', disabled: true },
};
