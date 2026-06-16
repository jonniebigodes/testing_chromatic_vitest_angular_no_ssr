import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { Header } from './ui-header';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
];

describe('Header', () => {
  test('renders the title', async () => {
    const screen = await render(Header, { inputs: { title: 'Dashboard' } });
    await expect
      .element(screen.getByRole('heading', { name: 'Dashboard' }))
      .toBeVisible();
    await takeSnapshot('Header - Default props');
  });

  test('renders navigation links', async () => {
    const screen = await render(Header, { inputs: { title: 'App', links } });
    await expect.element(screen.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect.element(screen.getByRole('link', { name: 'About' })).toBeVisible();
    await takeSnapshot('Header - Navigation links');
  });

  test('invokes linkClick with the clicked link', async () => {
    const linkClickSpy = vi.fn();
    const screen = await render(Header, {
      inputs: { title: 'App', links },
      outputs: { linkClick: linkClickSpy },
    });
    await screen.getByRole('link', { name: 'About' }).click();
    expect(linkClickSpy).toHaveBeenCalledWith(links[1]);
    await takeSnapshot('Header - Link click');
  });
});
