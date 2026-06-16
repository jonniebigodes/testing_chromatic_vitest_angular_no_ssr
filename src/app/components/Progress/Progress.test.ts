import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Progress } from './ui-progress';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Progress', () => {
  test('renders the default label', async () => {
    const screen = await render(Progress, { inputs: { value: 50 } });
    await expect.element(screen.getByText('Loading...')).toBeVisible();
    await takeSnapshot('Progress - Default props');
  });

  test('renders a custom label', async () => {
    const screen = await render(Progress, { inputs: { value: 50, label: 'Uploading' } });
    await expect.element(screen.getByText('Uploading')).toBeVisible();
    await takeSnapshot('Progress - Custom label');
  });

  test('exposes the value via the progressbar role', async () => {
    const screen = await render(Progress, { inputs: { value: 75 } });
    await expect
      .element(screen.getByRole('progressbar'))
      .toHaveAttribute('aria-valuenow', '75');
    await takeSnapshot('Progress - ARIA attributes');
  });
});
