import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

@Component({
  selector: 'ui-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Button.css',
  template: `
    <button
      type="button"
      class="button button--{{ size() }}"
      [style.background-color]="bgColor()"
      (click)="clicked.emit($event)"
    >
      {{ label() }}
    </button>
  `
})
export class Button {
  label = input('');
  size = input<'small' | 'medium' | 'large'>('medium');
  backgroundColor = input<string>();
  clicked = output<MouseEvent>();

  protected bgColor = computed(() => this.backgroundColor() ?? 'var(--color-blue-500)');
}
