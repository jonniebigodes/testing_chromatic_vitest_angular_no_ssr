import type { Meta, StoryObj } from '@storybook/angular';
import { DropDownMenu } from './ui-dropdown-menu';

const meta: Meta<DropDownMenu> = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    select: { action: 'select' }
  }
};
export default meta;

type Story = StoryObj<DropDownMenu>;

const items = ['Edit', 'Duplicate', 'Archive', 'Delete'];

export const Default: Story = {
  args: { label: 'Actions', items }
};

export const Inverted: Story = {
  args: { label: 'Actions', items, inverted: true }
};
