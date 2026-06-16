import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Pill } from './ui-pill';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'PolarizedPill' });

describe('Pill', () => {
  test('renders its content', async () => {
    const screen = await render(Pill, { inputs: { content: 'New' } });
    await expect.element(screen.getByText('New')).toBeVisible();
    await takeSnapshot('Pill - Default props');
  });

  test('renders the success variant with a green background', async () => {
    const screen = await render(Pill, { inputs: { content: 'Done', variant: 'success' } });
    await expect
      .element(screen.getByText('Done'))
      .toHaveStyle({ backgroundColor: 'rgb(102, 191, 60)' });
    await takeSnapshot('Pill - Success variant');
  });

  test('renders the warning variant with a yellow background', async () => {
    const screen = await render(Pill, { inputs: { content: 'Careful', variant: 'warning' } });
    await expect
      .element(screen.getByText('Careful'))
      .toHaveStyle({ backgroundColor: 'rgb(255, 174, 0)' });
    await takeSnapshot('Pill - Warning variant');
  });

  test('invokes clicked when interactive', async () => {
    const clickSpy = vi.fn();
    const screen = await render(Pill, {
      inputs: { content: 'Tap' },
      outputs: { clicked: clickSpy },
    });
    await screen.getByText('Tap').click();
    expect(clickSpy).toHaveBeenCalledTimes(1);
    await takeSnapshot('Pill - Clickable');
  });

  test('does not fire clicked when disabled', async () => {
    const clickSpy = vi.fn();
    const screen = await render(Pill, {
      inputs: { content: 'Off', disabled: true },
      outputs: { clicked: clickSpy },
    });
    await screen.getByText('Off').click();
    expect(clickSpy).not.toHaveBeenCalled();
    await takeSnapshot('Pill - Disabled');
  });
});
