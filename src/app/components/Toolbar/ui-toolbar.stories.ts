import type { Meta, StoryObj } from '@storybook/angular';
import { Toolbar } from './ui-toolbar';
import { Button } from '../Button/ui-button';

const meta: Meta<Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<Toolbar>;

export const Default: Story = {
  render: () => ({
    template: `
      <ui-toolbar>
        <ui-button label="Bold"></ui-button>
        <ui-button label="Italic"></ui-button>
        <ui-button label="Underline"></ui-button>
      </ui-toolbar>
    `,
    moduleMetadata: { imports: [Toolbar, Button] },
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <ui-toolbar orientation="vertical">
        <ui-button label="Top"></ui-button>
        <ui-button label="Middle"></ui-button>
        <ui-button label="Bottom"></ui-button>
      </ui-toolbar>
    `,
    moduleMetadata: { imports: [Toolbar, Button] },
  }),
};
