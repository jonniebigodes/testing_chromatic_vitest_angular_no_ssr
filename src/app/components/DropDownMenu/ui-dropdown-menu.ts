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
  selector: 'ui-dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './DropDownMenu.css',
  template: `
    <div class="dropdown-menu">
      <button
        type="button"
        class="dropdown-menu__trigger"
        [style.background-color]="buttonColor()"
        aria-haspopup="menu"
        [attr.aria-expanded]="open()"
        (click)="open.set(!open())"
      >
        {{ label() }}
        <span class="dropdown-menu__chevron">▼</span>
      </button>
      @if (open()) {
        <div class="dropdown-menu__panel">
          <div
            role="menu"
            class="dropdown-menu__menu"
            [class.dropdown-menu__menu--inverted]="inverted()"
            [class.dropdown-menu__menu--default]="!inverted()"
          >
            @for (item of items(); track $index) {
              <button
                type="button"
                role="menuitem"
                class="dropdown-menu__item"
                [class.dropdown-menu__item--inverted]="inverted()"
                [class.dropdown-menu__item--default]="!inverted()"
                (click)="handleSelect(item)"
              >
                {{ item }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class DropDownMenu implements OnDestroy {
  color = input<string>();
  label = input('');
  items = input<string[]>([]);
  inverted = input(false);

  select = output<string>();

  protected open = signal(false);

  protected buttonColor = computed(() =>
    this.inverted()
      ? 'var(--color-slate-800)'
      : (this.color() ?? 'var(--color-blue-500)')
  );

  private elementRef = inject(ElementRef);
  private doc = inject(DOCUMENT);

  constructor() {
    effect((onCleanup) => {
      if (this.open()) {
        const handleOutsideClick = (e: MouseEvent) => {
          if (!this.elementRef.nativeElement.contains(e.target as Node)) {
            this.open.set(false);
          }
        };
        const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') this.open.set(false);
        };
        this.doc.addEventListener('mousedown', handleOutsideClick);
        this.doc.addEventListener('keydown', handleEscape);
        onCleanup(() => {
          this.doc.removeEventListener('mousedown', handleOutsideClick);
          this.doc.removeEventListener('keydown', handleEscape);
        });
      }
    });
  }

  ngOnDestroy() {
    this.open.set(false);
  }

  protected handleSelect(item: string) {
    this.select.emit(item);
    this.open.set(false);
  }
}
