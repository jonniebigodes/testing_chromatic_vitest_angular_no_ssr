import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'ui-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Toggle.css',
  template: `
    <div class="toggle">
      <button
        type="button"
        [class.toggle__button--on]="pressed()"
        [class.toggle__button--off]="!pressed()"
        class="toggle__button"
        [attr.aria-pressed]="pressed()"
        [attr.aria-label]="label() ?? 'Toggle'"
        [disabled]="disabled()"
        [attr.name]="name() ?? null"
        (click)="handleClick()"
      >
        <div
          class="toggle__dot"
          [class.toggle__dot--on]="pressed()"
          [class.toggle__dot--off]="!pressed()"
        ></div>
      </button>
      @if (label()) {
        <span
          class="toggle__label"
          [class.toggle__label--disabled]="disabled()"
          [class.toggle__label--enabled]="!disabled()"
        >{{ label() }}</span>
      }
    </div>
  `
})
export class Toggle {
  pressed = input(false);
  disabled = input(false);
  name = input<string>();
  label = input<string>();
  pressedChange = output<boolean>();

  protected handleClick() {
    this.pressedChange.emit(!this.pressed());
  }
}
