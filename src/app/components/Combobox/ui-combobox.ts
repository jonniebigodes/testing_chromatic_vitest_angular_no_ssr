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

@Component({
  selector: 'ui-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Combobox.css',
  template: `
    <div class="combobox">
      @if (label()) {
        <label class="combobox__label" [for]="inputId">{{ label() }}</label>
      }
      <div class="combobox__input-wrapper">
        <input
          [id]="inputId"
          type="text"
          class="combobox__input"
          role="combobox"
          aria-autocomplete="list"
          [attr.aria-expanded]="isOpen()"
          [attr.name]="name() || null"
          [attr.required]="required() || null"
          [disabled]="disabled()"
          [placeholder]="placeholder()"
          [value]="inputValue()"
          (input)="handleInput($event)"
          (focus)="onFocus()"
          (keydown)="handleKeyDown($event)"
        />
        <div class="combobox__actions">
          <button
            type="button"
            class="combobox__icon-btn"
            aria-label="Clear"
            [disabled]="disabled()"
            (click)="clearValue()"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            type="button"
            class="combobox__icon-btn"
            aria-label="Toggle"
            [disabled]="disabled()"
            (click)="toggleOpen()"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      @if (isOpen()) {
        <div class="combobox__dropdown">
          <ul class="combobox__listbox" role="listbox">
            @if (filteredItems().length > 0) {
              @for (item of filteredItems(); track $index) {
                <li
                  role="option"
                  [attr.aria-selected]="isItemSelected(item)"
                  class="combobox__option"
                  [class.combobox__option--highlighted]="$index === highlightedIndex()"
                  (mousedown)="$event.preventDefault()"
                  (click)="handleSelect(item)"
                >
                  <span>{{ item }}</span>
                  @if (isItemSelected(item)) {
                    <span class="combobox__check">✓</span>
                  }
                </li>
              }
            } @else {
              <li class="combobox__empty">No results found</li>
            }
          </ul>
        </div>
      }
    </div>
  `
})
export class Combobox implements OnDestroy {
  private static nextId = 0;

  type = input<'single' | 'multiple'>('single');
  value = input<string[]>();
  open = input<boolean>();
  disabled = input(false);
  placeholder = input('Select an option');
  name = input<string>();
  required = input(false);
  items = input<string[]>([]);
  label = input<string>();

  valueChange = output<{ value: string[] }>();
  openChange = output<{ open: boolean }>();

  protected inputId = `combobox-${++Combobox.nextId}`;
  protected inputValue = signal('');
  protected highlightedIndex = signal(-1);

  private internalOpen = signal(false);
  private internalValue = signal<string[]>([]);

  protected isMultiple = computed(() => this.type() === 'multiple');

  protected isOpen = computed(() =>
    this.open() !== undefined ? this.open()! : this.internalOpen()
  );

  protected selectedValue = computed(() =>
    this.value() !== undefined ? this.value()! : this.internalValue()
  );

  protected filteredItems = computed(() =>
    this.items().filter(item =>
      item.toLowerCase().includes(this.inputValue().toLowerCase())
    )
  );

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

    effect(() => {
      if (!this.isMultiple() && this.selectedValue().length > 0) {
        const v = this.selectedValue()[0];
        if (v !== undefined) this.inputValue.set(v);
      }
    });
  }

  ngOnDestroy() {
    this.doc.removeEventListener('mousedown', this.handleOutsideClick);
  }

  protected isItemSelected(item: string) {
    return this.selectedValue().includes(item);
  }

  private setOpen(next: boolean) {
    if (this.open() === undefined) this.internalOpen.set(next);
    this.openChange.emit({ open: next });
  }

  private setValue(next: string[]) {
    if (this.value() === undefined) this.internalValue.set(next);
    this.valueChange.emit({ value: next });
  }

  protected onFocus() {
    if (!this.disabled()) this.setOpen(true);
  }

  protected toggleOpen() {
    if (!this.disabled()) this.setOpen(!this.isOpen());
  }

  protected clearValue() {
    this.setValue([]);
    this.inputValue.set('');
    this.highlightedIndex.set(-1);
  }

  protected handleInput(e: Event) {
    this.inputValue.set((e.currentTarget as HTMLInputElement).value);
    this.highlightedIndex.set(-1);
    if (!this.isOpen()) this.setOpen(true);
  }

  protected handleSelect(item: string) {
    if (this.isMultiple()) {
      const current = this.selectedValue();
      const next = current.includes(item)
        ? current.filter(v => v !== item)
        : [...current, item];
      this.setValue(next);
      this.inputValue.set('');
    } else {
      this.setValue([item]);
      this.inputValue.set(item);
      this.setOpen(false);
    }
    this.highlightedIndex.set(-1);
  }

  protected handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this.isOpen()) { this.setOpen(true); return; }
      const max = this.filteredItems().length - 1;
      this.highlightedIndex.update(i => i < max ? i + 1 : i);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.highlightedIndex.update(i => i > 0 ? i - 1 : 0);
    } else if (e.key === 'Enter') {
      const idx = this.highlightedIndex();
      if (this.isOpen() && idx >= 0) {
        const item = this.filteredItems()[idx];
        if (item !== undefined) {
          e.preventDefault();
          this.handleSelect(item);
        }
      }
    }
  }
}
