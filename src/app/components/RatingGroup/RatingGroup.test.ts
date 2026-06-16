import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { RatingGroup } from './ui-rating-group';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('RatingGroup', () => {
  test('renders the label', async () => {
    const screen = await render(RatingGroup, { inputs: { max: 5, label: 'Rate us' } });
    await expect.element(screen.getByText('Rate us')).toBeVisible();
    await takeSnapshot('RatingGroup - Default props');
  });

  test('renders one item per star in the range', async () => {
    const screen = await render(RatingGroup, { inputs: { min: 1, max: 5 } });
    await expect.element(screen.getByRole('radio').first()).toBeVisible();
    expect(screen.getByRole('radio').elements()).toHaveLength(5);
    await takeSnapshot('RatingGroup - Star items');
  });

  test('invokes valueChange when a star is selected', async () => {
    const valueChangeSpy = vi.fn();
    const screen = await render(RatingGroup, {
      inputs: { min: 1, max: 5 },
      outputs: { valueChange: valueChangeSpy },
    });
    await screen.getByRole('radio').nth(2).click();
    expect(valueChangeSpy).toHaveBeenCalled();
    await takeSnapshot('RatingGroup - Star selected');
  });
});
