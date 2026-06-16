import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Progress.css',
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="currentValue()"
      [attr.aria-valuemin]="min()"
      [attr.aria-valuemax]="max()"
      class="progress"
      [class.progress--horizontal]="orientation() === 'horizontal'"
      [class.progress--vertical]="orientation() === 'vertical'"
      [class.progress--disabled]="disabled()"
      [class.progress--readonly]="readonly()"
    >
      <div class="progress__header">
        <span class="progress__label">{{ label() ?? 'Loading...' }}</span>
        <span class="progress__percentage">{{ percentage() }}%</span>
      </div>
      <div
        class="progress__track"
        [class.progress__track--horizontal]="orientation() === 'horizontal'"
        [class.progress__track--vertical]="orientation() === 'vertical'"
      >
        <div
          class="progress__fill"
          [class.progress__fill--horizontal]="orientation() === 'horizontal'"
          [class.progress__fill--vertical]="orientation() === 'vertical'"
          [class.progress__fill--readonly]="readonly()"
          [class.progress__fill--default]="!readonly()"
          [style.width]="orientation() === 'vertical' ? '100%' : clampedPercentage() + '%'"
          [style.height]="orientation() === 'vertical' ? clampedPercentage() + '%' : '100%'"
        ></div>
      </div>
    </div>
  `
})
export class Progress {
  min = input(0);
  max = input(100);
  value = input<number>();
  disabled = input(false);
  readonly = input(false);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  label = input<string>();

  protected currentValue = computed(() => this.value() ?? this.min());

  protected clampedPercentage = computed(() => {
    const pct = ((this.currentValue() - this.min()) / (this.max() - this.min())) * 100;
    return Math.max(0, Math.min(100, pct));
  });

  protected percentage = computed(() => Math.round(this.clampedPercentage()));
}
