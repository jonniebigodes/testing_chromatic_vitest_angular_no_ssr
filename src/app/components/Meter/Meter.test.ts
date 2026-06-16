import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Meter } from './ui-meter';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Meter', () => {
  test('renders the label', async () => {
    const screen = await render(Meter, { inputs: { value: 40, label: 'Disk Usage' } });
    await expect.element(screen.getByText('Disk Usage')).toBeVisible();
    await takeSnapshot('Meter - Default props');
  });

  test('colors the range green when the value is in the optimal band', async () => {
    const screen = await render(Meter, { inputs: { value: 80, label: 'Health' } });
    await expect.element(screen.getByText('Health')).toBeVisible();
    const range = screen.container.querySelector('[data-part="range"]') as HTMLElement | null;
    expect(range).not.toBeNull();
    expect(range!).toHaveStyle({ backgroundColor: 'rgb(102, 191, 60)' });
    await takeSnapshot('Meter - Optimal range');
  });

  test('colors the range red when the value is far below optimum', async () => {
    const screen = await render(Meter, { inputs: { value: 10, label: 'Health' } });
    await expect.element(screen.getByText('Health')).toBeVisible();
    const range = screen.container.querySelector('[data-part="range"]') as HTMLElement | null;
    expect(range).not.toBeNull();
    expect(range!).toHaveStyle({ backgroundColor: 'rgb(232, 28, 97)' });
    await takeSnapshot('Meter - Far below optimum');
  });
});
