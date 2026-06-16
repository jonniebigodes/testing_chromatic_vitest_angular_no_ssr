import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-angular';
import { BasicAnimation } from './ui-basic-animation';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('BasicAnimation', () => {
  test('Default - renders with default props', async () => {
    const screen = await render(BasicAnimation);
    expect(screen.container.firstChild).toBeTruthy();
    await takeSnapshot('BasicAnimation - Default props');
  });
});
