import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  OnDestroy,
  inject,
  ElementRef,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Select.css',
  template: `
    <div class="select">
      @if (label()) {
        <span class="select__label">{{ label() }}</span>
      }
      <div>
        <button
          type="button"
          class="select__trigger"
          [disabled]="disabled()"
          aria-haspopup="listbox"
          [attr.aria-expanded]="isOpen()"
          (click)="toggleOpen()"
        >
          <span class="select__value" [class.select__value--placeholder]="!valueText()">
            {{ valueText() || placeholder() }}
          </span>
          <span class="select__chevron">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
      @if (isOpen()) {
        <div class="select__dropdown">
          <ul class="select__listbox" role="listbox" [attr.aria-multiselectable]="isMultiple() || null">
            @for (item of items(); track item.value) {
              <li
                role="option"
                [attr.aria-selected]="isItemSelected(item)"
                [attr.aria-disabled]="item.disabled || null"
                class="select__option"
                [class.select__option--disabled]="item.disabled"
                (click)="handleSelect(item)"
              >
                <span>{{ item.label }}</span>
                @if (isItemSelected(item)) {
                  <span class="select__check">✓</span>
                }
              </li>
            }
          </ul>
        </div>
      }
      <select
        class="select__native"
        [attr.name]="name() || null"
        [attr.required]="required() || null"
        [disabled]="disabled()"
        [attr.multiple]="isMultiple() || null"
        aria-hidden="true"
        tabindex="-1"
      >
        @if (!isMultiple()) {
          <option value=""></option>
        }
        @for (item of items(); track item.value) {
          <option [value]="item.value">{{ item.label }}</option>
        }
      </select>
    </div>
  `
})
export class Select implements OnDestroy {
  type = input<'single' | 'multiple'>('single');
  value = input<string[]>();
  open = input<boolean>();
  disabled = input(false);
  placeholder = input('Select an option');
  name = input<string>();
  required = input(false);
  items = input<SelectItem[]>([]);
  label = input<string>();

  valueChange = output<{ value: string[] }>();
  openChange = output<{ open: boolean }>();

  private internalOpen = signal(false);
  private internalValue = signal<string[]>([]);

  protected isMultiple = computed(() => this.type() === 'multiple');

  protected isOpen = computed(() =>
    this.open() !== undefined ? this.open()! : this.internalOpen()
  );

  protected selectedValue = computed(() =>
    this.value() !== undefined ? this.value()! : this.internalValue()
  );

  protected valueText = computed(() => {
    const selected = this.items().filter(item => this.selectedValue().includes(item.value));
    return selected.length > 0 ? selected.map(item => item.label).join(', ') : '';
  });

  private elementRef = inject(ElementRef);
  private doc = inject(DOCUMENT);

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.elementRef.nativeElement.contains(e.target as Node)) {
      this.setOpen(false);
    }
  };

  constructor() {
    effect((onCleanup) => {
      if (this.isOpen()) {
        this.doc.addEventListener('mousedown', this.handleOutsideClick);
        onCleanup(() => this.doc.removeEventListener('mousedown', this.handleOutsideClick));
      }
    });
  }

  ngOnDestroy() {
    this.doc.removeEventListener('mousedown', this.handleOutsideClick);
  }

  protected isItemSelected(item: SelectItem) {
    return this.selectedValue().includes(item.value);
  }

  private setOpen(next: boolean) {
    if (this.open() === undefined) this.internalOpen.set(next);
    this.openChange.emit({ open: next });
  }

  private setValue(next: string[]) {
    if (this.value() === undefined) this.internalValue.set(next);
    this.valueChange.emit({ value: next });
  }

  protected toggleOpen() {
    if (!this.disabled()) this.setOpen(!this.isOpen());
  }

  protected handleSelect(item: SelectItem) {
    if (item.disabled) return;
    if (this.isMultiple()) {
      const current = this.selectedValue();
      const next = current.includes(item.value)
        ? current.filter(v => v !== item.value)
        : [...current, item.value];
      this.setValue(next);
    } else {
      this.setValue([item.value]);
      this.setOpen(false);
    }
  }
}
