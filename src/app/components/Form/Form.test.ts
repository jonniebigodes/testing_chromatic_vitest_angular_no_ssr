import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Form } from './ui-form';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'PolarizedForm' });

describe('Form', () => {
  test('renders the form container', async () => {
    const screen = await render(Form);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('Form - Default props');
  });

  test('applies inverted class when inverted', async () => {
    const screen = await render(Form, { inputs: { inverted: true } });
    const form = screen.container.querySelector('form');
    expect(form?.classList.contains('form--inverted')).toBe(true);
    await takeSnapshot('Form - Inverted scenario');
  });

  test('applies a custom gap style', async () => {
    const screen = await render(Form, {
      inputs: { gap: 24, ariaLabel: 'spaced' }
    });
    await expect
      .element(screen.getByRole('form', { name: 'spaced' }))
      .toHaveStyle({ gap: '24px' });
    await takeSnapshot('Form - Custom gap');
  });
});
