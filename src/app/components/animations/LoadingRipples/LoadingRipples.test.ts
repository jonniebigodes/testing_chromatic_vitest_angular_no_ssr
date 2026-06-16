import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { LoadingRipples } from './ui-loading-ripples';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('LoadingRipples', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(LoadingRipples);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('LoadingRipples - Default props');
  });

  test('WarmTone - renders with custom color, ringCount, and cycleMs', async () => {
    const screen = await render(LoadingRipples, {
      inputs: { color: '#ea580c', ringCount: 4, cycleMs: 3000 },
    });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('LoadingRipples - WarmTone props');
  });
});
