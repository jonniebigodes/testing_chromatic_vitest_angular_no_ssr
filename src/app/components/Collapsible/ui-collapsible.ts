import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'ui-collapsible',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Collapsible.css',
  template: `
    <div class="collapsible">
      <button
        type="button"
        class="collapsible__trigger"
        (click)="toggle()"
        [disabled]="disabled()"
        [attr.aria-expanded]="isOpen()"
        aria-controls="collapsible-content"
      >
        <span>{{ label() }}</span>
        <span class="collapsible__chevron" [class.collapsible__chevron--open]="isOpen()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
      @if (isOpen()) {
        <div id="collapsible-content" role="region" class="collapsible__content">
          {{ body() }}
        </div>
      }
    </div>
  `
})
export class Collapsible {
  open = input<boolean>();
  disabled = input(false);
  label = input('Toggle');
  body = input<string>();
  openChange = output<{ open: boolean }>();

  private internalOpen = signal(false);

  protected isOpen = computed(() =>
    this.open() !== undefined ? this.open()! : this.internalOpen()
  );

  protected toggle() {
    if (this.disabled()) return;
    const next = !this.isOpen();
    if (this.open() === undefined) this.internalOpen.set(next);
    this.openChange.emit({ open: next });
  }
}
