import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';

@Component({
  selector: 'ui-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Calendar.css',
  template: `
    @if (focused()) {
      <div class="calendar">
        @if (heading()) {
          <div class="calendar__heading">{{ heading() }}</div>
        }
        <div class="calendar__view-control">
          <button
            type="button"
            aria-label="Previous month"
            class="calendar__arrow"
            [disabled]="disabled()"
            (click)="changeMonth(-1)"
          >←</button>
          <button type="button" class="calendar__view-trigger" [disabled]="disabled() || readOnly()">
            {{ headerLabel() }}
          </button>
          <button
            type="button"
            aria-label="Next month"
            class="calendar__arrow"
            [disabled]="disabled()"
            (click)="changeMonth(1)"
          >→</button>
        </div>
        <table role="grid" class="calendar__table">
          <thead>
            <tr>
              @for (wd of weekdayLabels(); track $index) {
                <th scope="col" class="calendar__weekday">{{ wd }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (week of weeks(); track $index) {
              <tr>
                @for (day of week; track $index) {
                  <td
                    class="calendar__cell"
                    role="gridcell"
                    [attr.aria-selected]="isSelected(day) || null"
                  >
                    <button
                      type="button"
                      [attr.aria-disabled]="isDayDisabled(day) || null"
                      [disabled]="disabled() || readOnly() || isDayDisabled(day)"
                      [class]="dayClass(day)"
                      (click)="selectDay(day, isOutsideMonth(day))"
                    >{{ day.day }}</button>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
        @if (name()) {
          <input type="hidden" [name]="name()!" [value]="hiddenValue()" />
        }
      </div>
    }
  `
})
export class Calendar implements OnInit {
  type = input<'single' | 'multiple'>('single');
  value = input<DateValue[]>();
  placeholder = input<DateValue>();
  weekStartsOn = input(0);
  weekdayFormat = input<'short' | 'narrow' | 'long'>('short');
  fixedWeeks = input(false);
  isDateDisabled = input<(date: DateValue) => boolean>();
  isDateUnavailable = input<(date: DateValue, locale: string) => boolean>();
  minValue = input<DateValue>();
  maxValue = input<DateValue>();
  locale = input('en-US');
  disabled = input(false);
  readOnly = input(false);
  disableDaysOutsideMonth = input(false);
  maxDays = input<number>();
  monthFormat = input<'long' | 'short' | 'narrow' | 'numeric' | '2-digit'>('long');
  heading = input<string>();
  name = input<string>();

  valueChange = output<{ value: DateValue[]; valueAsString: string[] }>();

  protected focused = signal<CalendarDate | null>(null);

  ngOnInit() {
    const init = this.value()?.[0] ?? this.placeholder() ?? today(getLocalTimeZone());
    this.focused.set(new CalendarDate(init.year, init.month, 1));
  }

  protected weekdayLabels = computed(() =>
    Array.from({ length: 7 }, (_, i) => {
      const dow = (this.weekStartsOn() + i) % 7;
      const reference = new Date(2024, 0, 7 + dow);
      return new Intl.DateTimeFormat(this.locale(), { weekday: this.weekdayFormat() }).format(reference);
    })
  );

  protected headerLabel = computed(() => {
    const f = this.focused();
    if (!f) return '';
    return new Intl.DateTimeFormat(this.locale(), { month: this.monthFormat(), year: 'numeric' }).format(
      new Date(f.year, f.month - 1, 1)
    );
  });

  protected weeks = computed(() => {
    const f = this.focused();
    if (!f) return [];
    const firstWeekday = new Date(f.year, f.month - 1, 1).getDay();
    const leadingDays = (firstWeekday - this.weekStartsOn() + 7) % 7;
    const daysInMonth = new Date(f.year, f.month, 0).getDate();
    const firstVisible = f.subtract({ days: leadingDays });
    const weekCount = this.fixedWeeks() ? 6 : Math.ceil((leadingDays + daysInMonth) / 7);
    return Array.from({ length: weekCount }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => firstVisible.add({ days: w * 7 + d }))
    );
  });

  protected hiddenValue = computed(() =>
    this.value()?.map(v => v.toString()).join(',') ?? ''
  );

  protected isSelected(day: DateValue) {
    return !!this.value()?.some(v => this.sameDay(v, day));
  }

  protected isDayDisabled(day: DateValue) {
    const minComp = this.toComparable(this.minValue());
    const maxComp = this.toComparable(this.maxValue());
    const comparable = this.toComparable(day)!;
    const outOfRange =
      (minComp !== null && comparable < minComp) ||
      (maxComp !== null && comparable > maxComp);
    const outsideMonth = this.isOutsideMonth(day);
    return (this.isDateDisabled()?.(day) ?? false) ||
      (this.isDateUnavailable()?.(day, this.locale()) ?? false) ||
      outOfRange ||
      (outsideMonth && this.disableDaysOutsideMonth());
  }

  protected isOutsideMonth(day: DateValue) {
    const f = this.focused();
    return f ? day.month !== f.month : false;
  }

  protected dayClass(day: DateValue) {
    if (this.isSelected(day)) return 'calendar__day calendar__day--selected';
    if (this.isDayDisabled(day)) return 'calendar__day calendar__day--disabled';
    if (this.isOutsideMonth(day)) return 'calendar__day calendar__day--outside';
    return 'calendar__day calendar__day--default';
  }

  protected changeMonth(delta: number) {
    if (this.disabled()) return;
    this.focused.update(f => f ? f.add({ months: delta }) : f);
  }

  protected selectDay(day: DateValue, outsideMonth: boolean) {
    if (this.disabled() || this.readOnly()) return;
    if (outsideMonth && this.disableDaysOutsideMonth()) return;
    const calDay = day as CalendarDate;
    let nextValue: DateValue[];
    if (this.type() === 'multiple') {
      const exists = this.value()?.some(v => this.sameDay(v, calDay));
      nextValue = exists
        ? (this.value() ?? []).filter(v => !this.sameDay(v, calDay))
        : [...(this.value() ?? []), calDay];
      const md = this.maxDays();
      if (md !== undefined && nextValue.length > md) return;
    } else {
      nextValue = [calDay];
    }
    this.valueChange.emit({ value: nextValue, valueAsString: nextValue.map(v => v.toString()) });
  }

  private toComparable(date: DateValue | undefined) {
    return date ? date.year * 10000 + date.month * 100 + date.day : null;
  }

  private sameDay(a: DateValue, b: DateValue) {
    return a.year === b.year && a.month === b.month && a.day === b.day;
  }
}
