import type { Meta, StoryObj } from '@storybook/angular';
import { Slider } from './ui-slider';

const meta: Meta<Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    valueChange: { action: 'valueChange' },
  },
};
export default meta;
type Story = StoryObj<Slider>;

export const Default: Story = {
  args: { value: [50], label: 'Volume' },
};

export const Disabled: Story = {
  args: { value: [30], label: 'Disabled', disabled: true },
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="height: 200px; display: flex; align-items: center;">
        <ui-slider [value]="[60]" orientation="vertical" label="Height"></ui-slider>
      </div>
    `,
    moduleMetadata: { imports: [Slider] },
  }),
};
