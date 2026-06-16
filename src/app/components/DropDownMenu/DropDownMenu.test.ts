import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { DropDownMenu } from './ui-dropdown-menu';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

const options = ['Edit', 'Duplicate', 'Delete'];

describe('DropDownMenu', () => {
  test('renders the trigger label', async () => {
    const screen = await render(DropDownMenu, {
      inputs: { label: 'Actions', items: options }
    });
    await expect
      .element(screen.getByRole('button', { name: /Actions/ }))
      .toBeVisible();
    await takeSnapshot('DropDownMenu - Default props');
  });

  test('reveals the options when opened', async () => {
    const screen = await render(DropDownMenu, {
      inputs: { label: 'Actions', items: options }
    });
    await screen.getByRole('button', { name: /Actions/ }).click();
    await expect
      .element(screen.getByRole('menuitem', { name: 'Edit' }))
      .toBeVisible();
    await takeSnapshot('DropDownMenu - Options visible after click');
  });

  test('invokes select with the chosen option', async () => {
    const onSelect = vi.fn();
    const screen = await render(DropDownMenu, {
      inputs: { label: 'Actions', items: options },
      outputs: { select: onSelect }
    });
    await screen.getByRole('button', { name: /Actions/ }).click();
    await screen.getByRole('menuitem', { name: 'Delete' }).click();
    expect(onSelect).toHaveBeenCalledWith('Delete');
    await takeSnapshot('DropDownMenu - Option selected');
  });
});
