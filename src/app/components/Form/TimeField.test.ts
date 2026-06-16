import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { TimeField } from './ui-time-field';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('TimeField', () => {
  test('renders its label', async () => {
    const screen = await render(TimeField, { inputs: { label: 'Start time' } });
    await expect.element(screen.getByText('Start time')).toBeVisible();
    await takeSnapshot('TimeField - Default props');
  });

  test('shows a clear button when a value is set', async () => {
    const screen = await render(TimeField, { inputs: { label: 'Time', value: '14:30' } });
    await expect
      .element(screen.getByRole('button', { name: 'Clear time' }))
      .toBeVisible();
    await takeSnapshot('TimeField - Clear button visible');
  });

  test('clears the value when the clear button is clicked', async () => {
    const valueChangeSpy = vi.fn();
    const screen = await render(TimeField, {
      inputs: { label: 'Time', value: '14:30' },
      outputs: { valueChange: valueChangeSpy },
    });
    await screen.getByRole('button', { name: 'Clear time' }).click();
    expect(valueChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ value: '' }));
    await takeSnapshot('TimeField - Value cleared');
  });

  test('hides the clear button when disabled', async () => {
    const screen = await render(TimeField, {
      inputs: { label: 'Time', value: '14:30', disabled: true },
    });
    expect(screen.getByRole('button', { name: 'Clear time' }).query()).toBeNull();
    await takeSnapshot('TimeField - Clear button hidden when disabled');
  });
});
