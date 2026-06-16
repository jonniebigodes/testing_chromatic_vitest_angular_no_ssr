import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Button } from './ui-button';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Button', () => {
  test('renders the provided label', async () => {
    const screen = await render(Button, { inputs: { label: 'Click me' } });
    await expect.element(screen.getByRole('button', { name: 'Click me' })).toBeVisible();
    await takeSnapshot('Button - Default props');
  });

  test('applies the requested background color', async () => {
    const screen = await render(Button, {
      inputs: { label: 'Red', backgroundColor: 'rgb(239, 68, 68)' },
    });
    await expect
      .element(screen.getByRole('button'))
      .toHaveStyle({ backgroundColor: 'rgb(239, 68, 68)' });
    await takeSnapshot('Button - Red background');
  });

  test('invokes clicked when pressed', async () => {
    const clickSpy = vi.fn();
    const screen = await render(Button, {
      inputs: { label: 'Press' },
      outputs: { clicked: clickSpy },
    });
    await screen.getByRole('button').click();
    expect(clickSpy).toHaveBeenCalledTimes(1);
    await takeSnapshot('Button - Click interaction');
  });

  test('honors the large size variant height', async () => {
    const screen = await render(Button, { inputs: { label: 'Large', size: 'large' } });
    await expect.element(screen.getByRole('button')).toHaveStyle({ height: '40px' });
    await takeSnapshot('Button - Large size');
  });

  test('honors the small size variant height', async () => {
    const screen = await render(Button, { inputs: { label: 'Smallish button', size: 'small' } });
    await expect.element(screen.getByRole('button')).toHaveStyle({ height: '24px' });
    await takeSnapshot('Button - Small size');
  });
});
