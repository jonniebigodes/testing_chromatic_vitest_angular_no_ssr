import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { SpringOscillator } from './ui-spring-oscillator';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('SpringOscillator', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(SpringOscillator);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('SpringOscillator - Default props');
  });

  test('WiderSpan - renders with custom spanPx', async () => {
    const screen = await render(SpringOscillator, { inputs: { spanPx: 80 } });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('SpringOscillator - WiderSpan props');
  });
});
