import type { Meta, StoryObj } from '@storybook/angular';
import { Avatar } from './ui-avatar';

const meta: Meta<Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<Avatar>;

export const Default: Story = {
  args: { fallback: 'JD', alt: 'John Doe' },
};

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/80', alt: 'User avatar', fallback: 'AB' },
};

export const BrokenImage: Story = {
  args: { src: 'broken.jpg', alt: 'Broken', fallback: 'NA' },
};
