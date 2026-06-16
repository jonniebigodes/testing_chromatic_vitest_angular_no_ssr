import { describe, test, expect } from 'vitest';
import { CalendarDate } from '@internationalized/date';
import { render } from 'vitest-browser-angular';
import { Calendar } from './ui-calendar';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('Calendar', () => {
  test('renders a custom heading label', async () => {
    const screen = await render(Calendar, {
      inputs: { value: [new CalendarDate(2024, 1, 15)], heading: 'Pick a date' }
    });
    await expect.element(screen.getByText('Pick a date')).toBeVisible();
    await takeSnapshot('Calendar - Default props');
  });

  test('renders weekday headers', async () => {
    const screen = await render(Calendar, {
      inputs: { value: [new CalendarDate(2024, 1, 15)] }
    });
    await expect.element(screen.getByText('Sun')).toBeVisible();
    await takeSnapshot('Calendar - Weekday headers');
  });

  test('renders day cells for the focused month', async () => {
    const screen = await render(Calendar, {
      inputs: { value: [new CalendarDate(2024, 1, 15)] }
    });
    await expect
      .element(screen.getByRole('button', { name: '15' }))
      .toBeVisible();
    await takeSnapshot('Calendar - Day cells for focused month');
  });
});
