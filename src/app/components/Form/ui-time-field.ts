import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from '@angular/core';

interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
}

@Component({
  selector: 'ui-time-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './TimeField.css',
  template: `
    <div class="time-field">
      @if (label()) {
        <label class="time-field__label">
          {{ label() }}
          @if (required()) {
            <span class="time-field__required">*</span>
          }
        </label>
      }
      <div class="time-field__wrapper" [class.time-field__wrapper--disabled]="disabled()">
        <input
          type="time"
          class="time-field__input"
          [class.time-field__input--disabled]="disabled()"
          [value]="value()"
          (change)="handleChange($event)"
          [attr.name]="name() ?? null"
          [attr.required]="required() || null"
          [disabled]="disabled()"
          [attr.readonly]="readonly() || null"
          [attr.step]="allowSeconds() ? '1' : null"
          [attr.placeholder]="placeholder() ?? null"
          [attr.min]="min() ?? null"
          [attr.max]="max() ?? null"
        />
        @if (showClear()) {
          <button
            type="button"
            class="time-field__clear"
            (click)="handleClear()"
            aria-label="Clear time"
          >×</button>
        }
      </div>
    </div>
  `
})
export class TimeField {
  value = input('');
  placeholder = input<string>();
  required = input(false);
  disabled = input(false);
  readonly = input(false);
  label = input<string>();
  name = input<string>();
  allowSeconds = input(false);
  min = input<string>();
  max = input<string>();
  valueChange = output<{ value: string; valueAsTime: TimeValue }>();

  protected showClear = computed(() => !!(this.value() && !this.disabled() && !this.readonly()));

  private parseTimeString(ts: string): TimeValue {
    const parts = ts.split(':');
    return {
      hour: parseInt(parts[0] || '0', 10),
      minute: parseInt(parts[1] || '0', 10),
      second: parts[2] ? parseInt(parts[2], 10) : undefined,
    };
  }

  protected handleChange(e: Event) {
    const newValue = (e.currentTarget as HTMLInputElement).value;
    this.valueChange.emit({ value: newValue, valueAsTime: this.parseTimeString(newValue) });
  }

  protected handleClear() {
    this.valueChange.emit({ value: '', valueAsTime: { hour: 0, minute: 0 } });
  }
}
