import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import type { PillVariant, PillSize } from './Pill.types';

@Component({
  selector: 'ui-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Pill.css',
  template: `
    <span [class]="classes()" (click)="handleClick()">{{ content() }}</span>
  `
})
export class Pill {
  variant = input<PillVariant>('default');
  size = input<PillSize>('medium');
  disabled = input(false);
  content = input('');
  clicked = output<void>();

  protected classes = computed(() => {
    return [
      'pill',
      `pill--${this.size()}`,
      this.disabled() ? 'pill--disabled' : `pill--${this.variant()}`,
      !this.disabled() ? 'pill--interactive' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected handleClick() {
    if (this.disabled()) return;
    this.clicked.emit();
  }
}
