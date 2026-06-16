import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { RadioGroup } from './ui-radio-group';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

const options = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

describe('RadioGroup', () => {
  test('renders the group label', async () => {
    const screen = await render(RadioGroup, { inputs: { options, label: 'Pick a size' } });
    await expect.element(screen.getByText('Pick a size')).toBeVisible();
    await takeSnapshot('RadioGroup - Default props');
  });

  test('renders every option label', async () => {
    const screen = await render(RadioGroup, { inputs: { options } });
    await expect.element(screen.getByText('Small')).toBeVisible();
    await expect.element(screen.getByText('Medium')).toBeVisible();
    await expect.element(screen.getByText('Large')).toBeVisible();
    await takeSnapshot('RadioGroup - Option labels');
  });

  test('invokes valueChange when an option is chosen', async () => {
    const valueChangeSpy = vi.fn();
    const screen = await render(RadioGroup, {
      inputs: { options },
      outputs: { valueChange: valueChangeSpy },
    });
    await screen.getByText('Medium').click();
    await takeSnapshot('RadioGroup - Medium option clicked');
    expect(valueChangeSpy).toHaveBeenCalledWith({ value: 'md' });
    await takeSnapshot('RadioGroup - Value change');
  });
});
