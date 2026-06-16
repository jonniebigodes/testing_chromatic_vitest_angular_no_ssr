import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Avatar } from './ui-avatar';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Avatar', () => {
  test('renders the fallback initials', async () => {
    const screen = await render(Avatar, { inputs: { fallback: 'JD', alt: 'John Doe' } });
    await expect.element(screen.getByText('JD')).toBeVisible();
    await takeSnapshot('Avatar - Default props');
  });

  test('applies a circular root shape', async () => {
    const screen = await render(Avatar, { inputs: { fallback: 'JD', alt: 'John Doe' } });
    const fallback = screen.getByText('JD');
    await expect.element(fallback).toBeVisible();
    const root = fallback.element().parentElement!;
    expect(root).toHaveStyle({ borderRadius: '50%' });
    await takeSnapshot('Avatar - Circular shape');
  });
});
