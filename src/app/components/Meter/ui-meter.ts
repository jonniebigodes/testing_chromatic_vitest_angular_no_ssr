import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { getMeterColor } from './Meter.types';

@Component({
  selector: 'ui-meter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Meter.css',
  template: `
    <div
      role="meter"
      [attr.aria-valuenow]="currentValue()"
      [attr.aria-valuemin]="min()"
      [attr.aria-valuemax]="max()"
      class="meter"
    >
      <div class="meter__header">
        @if (label()) {
          <span class="meter__label">{{ label() }}</span>
        }
        <span class="meter__percentage">{{ percentage() }}%</span>
      </div>
      <div class="meter__track">
        <div
          data-part="range"
          class="meter__range"
          [style.width]="clampedPercentage() + '%'"
          [style.background-color]="meterColor()"
        ></div>
      </div>
    </div>
  `
})
export class Meter {
  min = input(0);
  max = input(100);
  value = input(0);
  optimum = input<number>();
  low = input<number>();
  high = input<number>();
  label = input<string>();

  protected currentValue = computed(() => this.value() ?? this.min());

  protected clampedPercentage = computed(() => {
    const pct = ((this.currentValue() - this.min()) / (this.max() - this.min())) * 100;
    return Math.max(0, Math.min(100, pct));
  });

  protected percentage = computed(() => Math.round(this.clampedPercentage()));

  protected meterColor = computed(() =>
    getMeterColor(this.currentValue(), this.min(), this.max(), this.optimum(), this.low(), this.high())
  );
}
