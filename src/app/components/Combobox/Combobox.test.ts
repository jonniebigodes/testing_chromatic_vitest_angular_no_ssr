import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Combobox } from './ui-combobox';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'PolarizedCombobox' });

const items = ['React', 'Vue', 'Svelte'];

describe('Combobox', () => {
  test('renders the label', async () => {
    const screen = await render(Combobox, {
      inputs: { label: 'Framework', items }
    });
    await expect.element(screen.getByText('Framework')).toBeVisible();
    await takeSnapshot('Combobox - Default props');
  });

  test('renders an input with the placeholder', async () => {
    const screen = await render(Combobox, {
      inputs: { items, placeholder: 'Choose one...' }
    });
    await expect
      .element(screen.getByRole('combobox'))
      .toHaveAttribute('placeholder', 'Choose one...');
    await takeSnapshot('Combobox default props');
  });

  test('filters and selects an option by typing', async () => {
    const valueChange = vi.fn();
    const screen = await render(Combobox, {
      inputs: { items },
      outputs: { valueChange }
    });
    const input = screen.getByRole('combobox');
    await input.fill('Vue');
    await screen.getByRole('option', { name: 'Vue' }).click();
    expect(valueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['Vue'] })
    );
    await takeSnapshot('Combobox - Option selected');
  });
});
