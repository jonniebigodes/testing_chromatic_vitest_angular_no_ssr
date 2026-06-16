import type { Meta, StoryObj } from '@storybook/angular';
import { Footer } from './ui-footer';

const meta: Meta<Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    linkClick: { action: 'linkClick' },
  },
};
export default meta;

type Story = StoryObj<Footer>;

export const Default: Story = {};
export const WithLabel: Story = {
  args: { label: '© 2025 Acme Corp. All rights reserved.' },
};
export const WithLinks: Story = {
  args: { links: ['Privacy Policy', 'Terms of Service', 'About Us'] },
};
export const WithLinksAndLabel: Story = {
  args: { label: '© 2025 Acme Corp.', links: ['Privacy', 'Terms'] },
};
export const Inverted: Story = {
  args: { label: '© 2025 Acme Corp.', links: ['Privacy', 'Terms'], inverted: true },
  parameters: { backgrounds: { default: 'dark' } },
};
