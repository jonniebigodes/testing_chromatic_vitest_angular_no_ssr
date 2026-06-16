import type { Meta, StoryObj } from '@storybook/angular';
import { PinInput } from './ui-pin-input';

const meta: Meta<PinInput> = {
  title: 'Components/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    valueChange: { action: 'valueChange' },
  },
};
export default meta;
type Story = StoryObj<PinInput>;

export const Default: Story = {
  args: { label: 'Verification code', maxLength: 4 },
};

export const Masked: Story = {
  args: { label: 'PIN', maxLength: 4, mask: true },
};

export const Disabled: Story = {
  args: { label: 'Code', maxLength: 4, disabled: true },
};

export const OTP: Story = {
  args: { label: 'One-time code', maxLength: 6, otp: true },
};
