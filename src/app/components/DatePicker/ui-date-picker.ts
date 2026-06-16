import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  OnInit,
  OnDestroy,
  inject,
  ElementRef,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { Calendar } from '../Calendar/ui-calendar';

@Component({
  selector: 'ui-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Calendar],
  styleUrl: './DatePicker.css',
  template: `
    <div class="date-picker">
      @if (label()) {
        <span id="dp-label" class="date-picker__label">{{ label() }}</span>
      }
      <div class="date-picker__controls">
        <input
          type="text"
          readonly
          [value]="inputValue()"
          [attr.required]="required() || null"
          [disabled]="disabled()"
          class="date-picker__input"
        />
        <button
          type="button"
          aria-label="📅"
          aria-haspopup="dialog"
          [attr.aria-expanded]="isOpen()"
          [disabled]="disabled()"
          class="date-picker__trigger"
          (click)="setOpen(!isOpen())"
        >📅</button>
        <button
          type="button"
          [disabled]="disabled()"
          class="date-picker__clear"
          (click)="clearValue()"
        >Clear</button>
      </div>
      @if (isOpen()) {
        <div role="dialog" class="date-picker__dialog">
          <ui-calendar
            [type]="type()"
            [value]="value()"
            [locale]="locale()"
            [monthFormat]="monthFormat()"
            [weekdayFormat]="weekdayFormat()"
            [weekStartsOn]="weekStartsOn()"
            [fixedWeeks]="fixedWeeks()"
            [disabled]="disabled()"
            [readOnly]="readOnly()"
            [disableDaysOutsideMonth]="disableDaysOutsideMonth()"
            [isDateDisabled]="isDateDisabled()"
            [isDateUnavailable]="isDateUnavailable()"
            [minValue]="minValue()"
            [maxValue]="maxValue()"
            (valueChange)="onCalendarValueChange($event)"
          ></ui-calendar>
        </div>
      }
      @if (name()) {
        <input type="hidden" [name]="name()!" [value]="inputValue()" />
      }
    </div>
  `
})
export class DatePicker implements OnInit, OnDestroy {
  type = input<'single' | 'multiple'>('single');
  value = input<DateValue[]>();
  open = input<boolean>();
  placeholder = input<DateValue>();
  required = input(false);
  disabled = input(false);
  readOnly = input(false);
  locale = input('en-US');
  monthFormat = input<'long' | 'short' | 'narrow' | 'numeric' | '2-digit'>('long');
  weekdayFormat = input<'short' | 'narrow' | 'long'>('short');
  weekStartsOn = input(0);
  fixedWeeks = input(false);
  disableDaysOutsideMonth = input(false);
  closeOnDateSelect = input(false);
  isDateUnavailable = input<(date: DateValue, locale: string) => boolean>();
  isDateDisabled = input<(date: DateValue) => boolean>();
  minValue = input<DateValue>();
  maxValue = input<DateValue>();
  name = input<string>();
  label = input<string>();

  valueChange = output<{ value: DateValue[]; valueAsString: string[] }>();
  openChange = output<{ open: boolean }>();

  private internalOpen = signal(false);

  protected isOpen = computed(() =>
    this.open() !== undefined ? this.open()! : this.internalOpen()
  );

  protected inputValue = computed(() => {
    const vals = this.value();
    if (!vals || vals.length === 0) return '';
    return vals.map(d =>
      new Intl.DateTimeFormat(this.locale()).format(new Date(d.year, d.month - 1, d.day))
    ).join(', ');
  });

  private elementRef = inject(ElementRef);
  private doc = inject(DOCUMENT);

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.elementRef.nativeElement.contains(e.target as Node)) {
      this.setOpen(false);
    }
  };

  private handleDocKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.setOpen(false);
  };

  constructor() {
    effect((onCleanup) => {
      if (this.isOpen()) {
        this.doc.addEventListener('mousedown', this.handleOutsideClick);
        this.doc.addEventListener('keydown', this.handleDocKeyDown);
        onCleanup(() => {
          this.doc.removeEventListener('mousedown', this.handleOutsideClick);
          this.doc.removeEventListener('keydown', this.handleDocKeyDown);
        });
      }
    });
  }

  ngOnInit() {
    const init = this.value()?.[0] ?? this.placeholder() ?? today(getLocalTimeZone());
    void new CalendarDate(init.year, init.month, 1);
  }

  ngOnDestroy() {
    this.doc.removeEventListener('mousedown', this.handleOutsideClick);
    this.doc.removeEventListener('keydown', this.handleDocKeyDown);
  }

  protected setOpen(next: boolean) {
    if (this.open() === undefined) this.internalOpen.set(next);
    this.openChange.emit({ open: next });
  }

  protected clearValue() {
    if (!this.disabled()) {
      this.valueChange.emit({ value: [], valueAsString: [] });
    }
  }

  protected onCalendarValueChange(data: { value: DateValue[]; valueAsString: string[] }) {
    this.valueChange.emit(data);
    if (this.closeOnDateSelect()) this.setOpen(false);
  }
}
