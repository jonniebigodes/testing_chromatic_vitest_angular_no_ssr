import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { AspectRatio } from './ui-aspect-ratio';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('AspectRatio', () => {
  test('renders an aspect ratio container', async () => {
    const screen = await render(AspectRatio, { inputs: { ratio: 16 / 9 } });
    const container = screen.container.querySelector('.aspect-ratio');
    expect(container).not.toBeNull();
    await takeSnapshot('AspectRatio with child content');
  });

  test('centers content inside the frame via flex layout', async () => {
    const screen = await render(AspectRatio, { inputs: { ratio: 1 } });
    const inner = screen.container.querySelector('.aspect-ratio__inner') as HTMLElement;
    expect(inner).not.toBeNull();
    expect(inner).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
    await takeSnapshot('AspectRatio with centered content');
  });
});
