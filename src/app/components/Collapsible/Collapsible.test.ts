import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Collapsible } from './ui-collapsible';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Collapsible', () => {
  test('renders the trigger label', async () => {
    const screen = await render(Collapsible, {
      inputs: { label: 'Details', body: 'Hidden body' }
    });
    await expect.element(screen.getByText('Details')).toBeVisible();
    await takeSnapshot('Collapsible - Default props');
  });

  test('reveals content when open', async () => {
    const screen = await render(Collapsible, {
      inputs: { label: 'Details', open: true, body: 'Visible body' }
    });
    await expect.element(screen.getByText('Visible body')).toBeVisible();
    await takeSnapshot('Collapsible - Open state');
  });

  test('disables the trigger when disabled', async () => {
    const screen = await render(Collapsible, {
      inputs: { label: 'Details', disabled: true, body: 'Body' }
    });
    await expect
      .element(screen.getByRole('button', { name: 'Details' }))
      .toBeDisabled();
    await takeSnapshot('Collapsible - Disabled state');
  });
});
