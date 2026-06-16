import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Label.css',
  template: `
    <label [attr.for]="htmlFor() || null" [class]="classes()">
      {{ content() }}
    </label>
  `
})
export class Label {
  htmlFor = input<string>();
  inverted = input(false);
  content = input<string>();

  protected classes = computed(() => [
    'label',
    this.htmlFor() ? 'label--linked' : '',
    this.inverted() ? 'label--inverted' : '',
  ].filter(Boolean).join(' '));
}
