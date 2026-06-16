import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './RadioGroup.css',
  template: `
    <div role="radiogroup" [attr.aria-orientation]="orientation()" class="radio-group">
      @if (label()) {
        <span class="radio-group__label">
          {{ label() }}
          @if (required()) {
            <span class="radio-group__required">*</span>
          }
        </span>
      }
      <div
        class="radio-group__options"
        [class.radio-group__options--horizontal]="orientation() === 'horizontal'"
        [class.radio-group__options--vertical]="orientation() === 'vertical'"
      >
        @for (option of options(); track option.value) {
          <label
            class="radio-group__item"
            [class.radio-group__item--disabled]="isItemDisabled(option)"
            [class.radio-group__item--interactive]="!isItemDisabled(option)"
          >
            <input
              type="radio"
              class="radio-group__input"
              [attr.name]="groupName()"
              [attr.value]="option.value"
              [checked]="selectedValue() === option.value"
              [disabled]="isItemDisabled(option)"
              [attr.required]="required() || null"
              (change)="selectOption(option)"
            />
            <span
              aria-hidden="true"
              class="radio-group__indicator"
              [class.radio-group__indicator--checked]="selectedValue() === option.value"
              [attr.data-state]="selectedValue() === option.value ? 'checked' : 'unchecked'"
            ></span>
            <span
              class="radio-group__option-label"
              [class.radio-group__option-label--disabled]="disabled() || option.disabled"
            >{{ option.label }}</span>
          </label>
        }
      </div>
    </div>
  `
})
export class RadioGroup {
  options = input<RadioOption[]>([]);
  disabled = input(false);
  required = input(false);
  name = input<string>();
  orientation = input<'horizontal' | 'vertical'>('vertical');
  readOnly = input(false);
  label = input<string>();
  value = input<string>();
  defaultValue = input<string>();
  valueChange = output<{ value: string }>();

  private internalValue = signal<string | null>(null);

  protected groupName = computed(() => this.name() ?? 'radio-group');

  protected selectedValue = computed(() =>
    this.value() !== undefined ? this.value() : this.internalValue()
  );

  protected isItemDisabled(option: RadioOption) {
    return this.disabled() || this.readOnly() || !!option.disabled;
  }

  protected selectOption(option: RadioOption) {
    if (this.isItemDisabled(option)) return;
    if (this.value() === undefined) this.internalValue.set(option.value);
    this.valueChange.emit({ value: option.value });
  }
}
