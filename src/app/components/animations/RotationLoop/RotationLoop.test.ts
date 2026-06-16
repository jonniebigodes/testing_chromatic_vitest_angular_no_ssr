import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { RotationLoop } from './ui-rotation-loop';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('RotationLoop', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(RotationLoop);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('RotationLoop - Default props');
  });

  test('Slower - renders with custom durationMs', async () => {
    const screen = await render(RotationLoop, { inputs: { durationMs: 6000 } });
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('RotationLoop - Slower props');
  });
});
