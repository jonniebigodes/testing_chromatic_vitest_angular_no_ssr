import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { ScrambleTextReveal } from './ui-scramble-text-reveal';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('ScrambleTextReveal', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(ScrambleTextReveal);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('ScrambleTextReveal - Default props');
  });

  test('StatusLabels - renders with custom words and timing', async () => {
    const screen = await render(ScrambleTextReveal, {
      inputs: { words: ['Idle', 'Fetching', 'Ready'], wordHoldMs: 2800, scrambleTickMs: 40 },
    });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('ScrambleTextReveal - StatusLabels props');
  });
});
