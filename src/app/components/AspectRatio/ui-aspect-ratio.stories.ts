import type { Meta, StoryObj } from '@storybook/angular';
import { AspectRatio } from './ui-aspect-ratio';

const meta: Meta<AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<AspectRatio>;

export const Widescreen: Story = {
  render: () => ({
    template: `
      <div style="width: 480px">
        <ui-aspect-ratio [ratio]="16 / 9">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px">
            16 : 9
          </div>
        </ui-aspect-ratio>
      </div>
    `,
    moduleMetadata: { imports: [AspectRatio] },
  }),
};

export const Square: Story = {
  render: () => ({
    template: `
      <div style="width: 300px">
        <ui-aspect-ratio [ratio]="1">
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px">
            1 : 1
          </div>
        </ui-aspect-ratio>
      </div>
    `,
    moduleMetadata: { imports: [AspectRatio] },
  }),
};

export const FourThree: Story = {
  render: () => ({
    template: `
      <div style="width: 400px">
        <ui-aspect-ratio [ratio]="4 / 3">
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px">
            4 : 3
          </div>
        </ui-aspect-ratio>
      </div>
    `,
    moduleMetadata: { imports: [AspectRatio] },
  }),
};
