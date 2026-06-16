import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { FillTextLoading } from './ui-fill-text-loading';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({
  title: 'PolarizedFillTextLoading',
});

describe('FillTextLoading', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(FillTextLoading);
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText('Loading').first()).toBeVisible();
    await takeSnapshot('FillTextLoading - Default props');
  });

  test('LongLabel - renders with custom label and cycleMs', async () => {
    const screen = await render(FillTextLoading, { inputs: { label: 'Synchronizing', cycleMs: 3000 } });
    expect(screen.container.firstChild).toBeTruthy();
    await expect.element(screen.getByText('Synchronizing').first()).toBeVisible();
    await takeSnapshot('FillTextLoading - LongLabel props');
  });
});
