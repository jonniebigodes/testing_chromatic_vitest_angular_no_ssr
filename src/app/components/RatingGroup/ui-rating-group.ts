import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'ui-rating-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './RatingGroup.css',
  template: `
    <div
      role="radiogroup"
      class="rating-group"
      [class.rating-group--vertical]="orientation() === 'vertical'"
      [class.rating-group--horizontal]="orientation() === 'horizontal'"
    >
      @if (label()) {
        <span class="rating-group__label">{{ label() }}</span>
      }
      <div
        class="rating-group__stars"
        [class.rating-group__stars--vertical]="orientation() === 'vertical'"
        [class.rating-group__stars--horizontal]="orientation() === 'horizontal'"
      >
        @for (ratingValue of stars(); track ratingValue) {
          <span
            role="radio"
            [attr.aria-checked]="currentValue() === ratingValue"
            [attr.aria-label]="ratingValue"
            [attr.tabindex]="interactive() ? 0 : -1"
            class="rating-group__star"
            [class.rating-group__star--interactive]="interactive()"
            [class.rating-group__star--disabled]="disabled()"
            (click)="selectValue(ratingValue)"
            (mouseenter)="onMouseEnter(ratingValue)"
            (mouseleave)="onMouseLeave()"
          >
            <svg
              class="rating-group__star-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              [attr.fill]="ratingValue <= highlightValue() ? 'currentColor' : 'none'"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        }
        @if (name()) {
          <input type="hidden" [attr.name]="name()" [attr.value]="currentValue()" [attr.required]="required() || null" />
        }
      </div>
    </div>
  `
})
export class RatingGroup {
  min = input(1);
  max = input(5);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  disabled = input(false);
  readOnly = input(false);
  label = input<string>();
  value = input<number>();
  defaultValue = input<number>();
  name = input<string>();
  required = input(false);
  valueChange = output<{ value: number }>();

  private internalValue = signal(0);
  private hovered = signal<number | null>(null);

  protected stars = computed(() =>
    Array.from({ length: this.max() - this.min() + 1 }, (_, i) => this.min() + i)
  );

  protected interactive = computed(() => !this.disabled() && !this.readOnly());

  protected currentValue = computed(() =>
    this.value() !== undefined ? this.value()! : this.internalValue()
  );

  protected highlightValue = computed(() => this.hovered() ?? this.currentValue());

  protected selectValue(ratingValue: number) {
    if (!this.interactive()) return;
    if (this.value() === undefined) this.internalValue.set(ratingValue);
    this.valueChange.emit({ value: ratingValue });
  }

  protected onMouseEnter(ratingValue: number) {
    if (this.interactive()) this.hovered.set(ratingValue);
  }

  protected onMouseLeave() {
    if (this.interactive()) this.hovered.set(null);
  }
}
