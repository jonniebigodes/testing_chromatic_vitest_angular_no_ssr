import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Checkbox } from './ui-checkbox';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Checkbox', () => {
  test('renders its label', async () => {
    const screen = await render(Checkbox, { inputs: { label: 'Accept terms' } });
    await expect.element(screen.getByText('Accept terms')).toBeVisible();
    await takeSnapshot('Checkbox - Default props');
  });

  test('reflects the checked prop', async () => {
    const screen = await render(Checkbox, { inputs: { checked: true, label: 'Subscribed' } });
    await expect.element(screen.getByRole('checkbox')).toBeChecked();
    await takeSnapshot('Checkbox - Checked state');
  });

  test('invokes checkedChange when toggled', async () => {
    const checkedChangeSpy = vi.fn();
    const screen = await render(Checkbox, {
      inputs: { label: 'Toggle me' },
      outputs: { checkedChange: checkedChangeSpy },
    });
    await screen.getByText('Toggle me').click();
    expect(checkedChangeSpy).toHaveBeenCalled();
    await takeSnapshot('Checkbox - Toggled');
  });

  test('does not toggle when disabled', async () => {
    const checkedChangeSpy = vi.fn();
    const screen = await render(Checkbox, {
      inputs: { disabled: true, label: 'Disabled' },
      outputs: { checkedChange: checkedChangeSpy },
    });
    await screen.getByText('Disabled').click({ force: true });
    expect(checkedChangeSpy).not.toHaveBeenCalled();
    await takeSnapshot('Checkbox - Disabled state');
  });
});
