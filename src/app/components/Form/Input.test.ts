import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Input } from './ui-input';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Input', () => {
  test('renders with the given placeholder', async () => {
    const screen = await render(Input, { inputs: { placeholder: 'john@example.com' } });
    await expect
      .element(screen.getByRole('textbox'))
      .toHaveAttribute('placeholder', 'john@example.com');
    await takeSnapshot('Input - Default props');
  });

  test('accepts typed text', async () => {
    const screen = await render(Input, { inputs: { placeholder: 'name' } });
    const input = screen.getByRole('textbox');
    await input.fill('Jane');
    await expect.element(input).toHaveValue('Jane');
    await takeSnapshot('Input - Typed text');
  });

  test('renders inverted styling', async () => {
    const screen = await render(Input, { inputs: { placeholder: 'name', inverted: true } });
    await expect
      .element(screen.getByRole('textbox'))
      .toHaveStyle({ color: 'rgb(255, 255, 255)' });
    await takeSnapshot('Input - Inverted styling');
  });
});
