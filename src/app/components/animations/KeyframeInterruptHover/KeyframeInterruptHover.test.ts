import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { KeyframeInterruptHover } from './ui-keyframe-interrupt-hover';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('KeyframeInterruptHover', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(KeyframeInterruptHover);
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText('Keyframe (remount)')).toBeVisible();
    await expect.element(screen.getByText('Hover-like')).toBeVisible();
    await expect.element(screen.getByText('Interruptible timing')).toBeVisible();
    await takeSnapshot('KeyframeInterruptHover - Default props');
  });

  test('FasterInterrupts - renders with custom timing', async () => {
    const screen = await render(KeyframeInterruptHover, {
      inputs: { keyframeCycleMs: 1200, interruptCycleMs: 320 },
    });
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText('Hover-like')).toBeVisible();
    await takeSnapshot('KeyframeInterruptHover - FasterInterrupts props');
  });
});
