import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { BounceElevation } from './ui-bounce-elevation';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('BounceElevation', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(BounceElevation);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('BounceElevation - Default props');
  });

  test('HigherLift - renders with custom liftPx and cycleMs', async () => {
    const screen = await render(BounceElevation, { inputs: { liftPx: 52, cycleMs: 1800 } });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('BounceElevation - Custom liftPx and cycleMs');
  });
});
