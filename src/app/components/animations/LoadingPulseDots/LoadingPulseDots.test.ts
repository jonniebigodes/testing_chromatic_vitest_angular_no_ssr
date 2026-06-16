import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { LoadingPulseDots } from './ui-loading-pulse-dots';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  title: 'PolarizedLoadingPulseDots',
});

describe('LoadingPulseDots', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(LoadingPulseDots);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('LoadingPulseDots - Default props');
  });

  test('Compact - renders with custom dotCount, cycleMs, and color', async () => {
    const screen = await render(LoadingPulseDots, {
      inputs: { dotCount: 7, cycleMs: 1000, color: '#0d9488' },
    });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('LoadingPulseDots - Compact props');
  });
});
