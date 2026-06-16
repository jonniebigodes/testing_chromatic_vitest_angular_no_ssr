import type { Meta, StoryObj } from '@storybook/angular';
import { Accordion } from './ui-accordion';

const meta: Meta<Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<Accordion>;

const items = [
  {
    title: 'What is Storybook?',
    content: 'Storybook is a frontend workshop for building UI components in isolation.',
  },
  {
    title: 'What is Angular?',
    content: 'Angular is a platform for building mobile and desktop web applications.',
  },
  {
    title: 'What is Chromatic?',
    content: 'Chromatic automates visual testing and review for Storybook.',
  },
];

export const Default: Story = {
  args: { items },
};

export const Inverted: Story = {
  args: { items, inverted: true },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
