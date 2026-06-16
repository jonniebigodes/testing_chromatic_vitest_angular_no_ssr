import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Toolbar } from './ui-toolbar';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Toolbar', () => {
  test('renders a toolbar role element', async () => {
    const screen = await render(Toolbar);
    await expect.element(screen.getByRole('toolbar')).toBeVisible();
    await takeSnapshot('Toolbar - Default props');
  });

  test('lays out horizontally by default', async () => {
    const screen = await render(Toolbar);
    await expect
      .element(screen.getByRole('toolbar'))
      .toHaveStyle({ flexDirection: 'row' });
    await takeSnapshot('Toolbar - Horizontal layout');
  });

  test('lays out vertically when requested', async () => {
    const screen = await render(Toolbar, { inputs: { orientation: 'vertical' } });
    await expect
      .element(screen.getByRole('toolbar'))
      .toHaveStyle({ flexDirection: 'column' });
    await takeSnapshot('Toolbar - Vertical layout');
  });
});
