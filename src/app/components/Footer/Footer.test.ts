import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Footer } from './ui-footer';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Footer', () => {
  test('renders the label text', async () => {
    const screen = await render(Footer, { inputs: { label: '© 2025 Acme' } });
    await expect.element(screen.getByText('© 2025 Acme')).toBeVisible();
    await takeSnapshot('Footer - Default props');
  });

  test('renders the provided links', async () => {
    const screen = await render(Footer, { inputs: { links: ['Privacy', 'Terms'] } });
    await expect.element(screen.getByText('Privacy')).toBeVisible();
    await expect.element(screen.getByText('Terms')).toBeVisible();
    await takeSnapshot('Footer - Links visible');
  });

  test('invokes linkClick with the clicked link', async () => {
    const linkClickSpy = vi.fn();
    const screen = await render(Footer, {
      inputs: { links: ['Privacy'] },
      outputs: { linkClick: linkClickSpy },
    });
    await screen.getByText('Privacy').click();
    expect(linkClickSpy).toHaveBeenCalledWith('Privacy');
    await takeSnapshot('Footer - Link clicked');
  });
});
