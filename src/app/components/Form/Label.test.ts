import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Label } from './ui-label';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Label', () => {
  test('renders its text', async () => {
    const screen = await render(Label, { inputs: { htmlFor: 'email', content: 'Email Address' } });
    await expect.element(screen.getByText('Email Address')).toBeVisible();
    await takeSnapshot('Label - Default props');
  });

  test('associates with a field via htmlFor', async () => {
    const screen = await render(Label, { inputs: { htmlFor: 'email', content: 'Email Address' } });
    await expect.element(screen.getByText('Email Address')).toBeVisible();
    const label = screen.container.querySelector('label') as HTMLElement;
    expect(label).not.toBeNull();
    expect(label).toHaveAttribute('for', 'email');
    await takeSnapshot('Label - Associated with field');
  });

  test('uses inverted text color when inverted', async () => {
    const screen = await render(Label, { inputs: { inverted: true, content: 'Inverted' } });
    await expect
      .element(screen.getByText('Inverted'))
      .toHaveStyle({ color: 'rgb(255, 255, 255)' });
    await takeSnapshot('Label - Inverted styling');
  });
});
