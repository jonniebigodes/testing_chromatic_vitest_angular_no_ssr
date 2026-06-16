import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Divider.css',
  template: `
    <div class="divider" [class.divider--inverted]="inverted()">
      <hr class="divider__line" [style.background-color]="lineColor()" />
    </div>
  `
})
export class Divider {
  color = input<string>();
  inverted = input(false);

  protected lineColor = computed(() =>
    this.inverted() ? 'var(--color-white)' : (this.color() ?? 'var(--color-slate-300)')
  );
}
