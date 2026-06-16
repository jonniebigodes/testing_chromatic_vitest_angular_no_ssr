import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Form.css',
  template: `
    <form
      class="form"
      [class.form--inverted]="inverted()"
      [style.gap]="resolvedGap()"
      [attr.aria-label]="ariaLabel() || null"
    >
      <ng-content></ng-content>
    </form>
  `
})
export class Form {
  inverted = input(false);
  gap = input<string | number>();
  ariaLabel = input<string>();

  protected resolvedGap = computed(() => {
    const g = this.gap();
    if (g === undefined) return null;
    return typeof g === 'number' ? `${g}px` : g;
  });
}
