import type { Meta, StoryObj } from '@storybook/angular';
import { Header } from './ui-header';
import type { HeaderLink } from './Header.types';

const links: HeaderLink[] = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const meta: Meta<Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    linkClick: { action: 'linkClick' },
  },
};
export default meta;

type Story = StoryObj<Header>;

export const Default: Story = { args: { title: 'My Application' } };
export const WithLinks: Story = { args: { title: 'My App', links } };
export const Inverted: Story = {
  args: { title: 'My App', links, inverted: true },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
export const FullWidth: Story = { args: { title: 'Wide App', links, fullWidth: true } };
export const Sticky: Story = { args: { title: 'Sticky App', links, isSticky: true } };
