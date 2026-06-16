import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Toggle } from './ui-toggle';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'PolarizedToggle' });

describe('Toggle', () => {
  test('renders the accompanying label', async () => {
    const screen = await render(Toggle, { inputs: { label: 'Notifications' } });
    await expect.element(screen.getByText('Notifications')).toBeVisible();
    await takeSnapshot('Toggle - Default props');
  });

  test('reflects the pressed state', async () => {
    const screen = await render(Toggle, { inputs: { pressed: true, label: 'On' } });
    await expect
      .element(screen.getByRole('button'))
      .toHaveAttribute('aria-pressed', 'true');
    await takeSnapshot('Toggle - Pressed state');
  });

  test('invokes pressedChange when clicked', async () => {
    const pressedChangeSpy = vi.fn();
    const screen = await render(Toggle, {
      inputs: { label: 'X' },
      outputs: { pressedChange: pressedChangeSpy },
    });
    await screen.getByRole('button').click();
    expect(pressedChangeSpy).toHaveBeenCalledWith(true);
    await takeSnapshot('Toggle - Pressed state after click');
  });

  test('is disabled when the disabled prop is set', async () => {
    const screen = await render(Toggle, { inputs: { disabled: true, label: 'X' } });
    await expect.element(screen.getByRole('button')).toBeDisabled();
    await takeSnapshot('Toggle - Disabled state');
  });
});
