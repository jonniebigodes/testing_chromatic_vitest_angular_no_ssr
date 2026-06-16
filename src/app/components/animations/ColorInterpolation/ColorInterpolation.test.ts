import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { ColorInterpolation } from './ui-color-interpolation';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  title: 'PolarizedColorInterpolation',
});

describe('ColorInterpolation', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(ColorInterpolation);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('ColorInterpolation - Default props');
  });

  test('SlowerSweep - renders with custom durationMs', async () => {
    const screen = await render(ColorInterpolation, { inputs: { durationMs: 6000 } });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('ColorInterpolation - SlowerSweep props');
  });
});
