import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Slider } from './ui-slider';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Slider', () => {
  test('renders the label', async () => {
    const screen = await render(Slider, { inputs: { value: [50], label: 'Volume' } });
    await expect.element(screen.getByText('Volume')).toBeVisible();
    await takeSnapshot('Slider - Default props');
  });

  test('exposes the current value via the slider role', async () => {
    const screen = await render(Slider, { inputs: { value: [30], label: 'Volume' } });
    await expect
      .element(screen.getByRole('slider'))
      .toHaveAttribute('aria-valuenow', '30');
    await takeSnapshot('Slider - ARIA attributes');
  });

  test('marks the slider thumb disabled when disabled', async () => {
    const screen = await render(Slider, { inputs: { value: [10], disabled: true, label: 'Volume' } });
    await expect
      .element(screen.getByRole('slider'))
      .toHaveAttribute('aria-disabled', 'true');
    await takeSnapshot('Slider - Disabled state');
  });
});
