import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { ParallaxLayers } from './ui-parallax-layers';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  title: 'PolarizedParallaxLayers',
});

describe('ParallaxLayers', () => {
  test('Horizontal - renders with horizontal axis', async () => {
    const screen = await render(ParallaxLayers, { inputs: { axis: 'horizontal' } });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('ParallaxLayers - Default props');
  });

  test('Vertical - renders with vertical axis and custom durationMs', async () => {
    const screen = await render(ParallaxLayers, {
      inputs: { axis: 'vertical', durationMs: 4200 },
    });
    expect(screen.container.firstChild).toBeTruthy();
  });
});
