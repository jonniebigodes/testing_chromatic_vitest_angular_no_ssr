import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Checkbox.css',
  template: `
    <label class="checkbox" [class.checkbox--disabled]="disabled()">
      <input
        type="checkbox"
        class="checkbox__input"
        [checked]="isChecked()"
        (change)="handleChange($event)"
        [disabled]="disabled()"
        [attr.required]="required() || null"
        [attr.name]="name() ?? null"
        [attr.value]="value()"
      />
      <span aria-hidden="true" class="checkbox__box" [class.checkbox__box--checked]="isChecked()">
        <span class="checkbox__check" [class.checkbox__check--visible]="isChecked()">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </span>
      @if (label()) {
        <span class="checkbox__label">{{ label() }}</span>
      }
    </label>
  `
})
export class Checkbox implements OnChanges {
  checked = input<boolean>();
  disabled = input(false);
  required = input(false);
  name = input<string>();
  value = input('on');
  readOnly = input(false);
  label = input<string>();
  checkedChange = output<{ checked: boolean }>();

  protected isChecked = signal(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['checked'] && this.checked() !== undefined) {
      this.isChecked.set(this.checked()!);
    }
  }

  protected handleChange(e: Event) {
    if (this.readOnly()) return;
    const next = (e.currentTarget as HTMLInputElement).checked;
    if (this.checked() === undefined) this.isChecked.set(next);
    this.checkedChange.emit({ checked: next });
  }
}
