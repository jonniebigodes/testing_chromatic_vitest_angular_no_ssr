import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { PinInput } from './ui-pin-input';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('PinInput', () => {
  test('renders the label', async () => {
    const screen = await render(PinInput, { inputs: { label: 'Verification code' } });
    await expect.element(screen.getByText('Verification code')).toBeVisible();
    await takeSnapshot('PinInput - Default props');
  });

  test('renders one field per maxLength', async () => {
    const screen = await render(PinInput, { inputs: { maxLength: 4 } });
    await expect.element(screen.getByRole('textbox').first()).toBeVisible();
    expect(screen.getByRole('textbox').elements()).toHaveLength(4);
    await takeSnapshot('PinInput - Max length fields');
  });

  test('disables the fields when disabled', async () => {
    const screen = await render(PinInput, { inputs: { maxLength: 3, disabled: true } });
    await expect.element(screen.getByRole('textbox').first()).toBeVisible();
    const inputs = screen.getByRole('textbox').elements();
    expect(inputs).toHaveLength(3);
    inputs.forEach((input) => expect(input).toBeDisabled());
    await takeSnapshot('PinInput - Disabled');
  });
});
