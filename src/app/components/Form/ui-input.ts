import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'ui-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Input.css',
  template: `
    <input
      class="input"
      [class.input--inverted]="inverted()"
      [type]="type()"
      [placeholder]="placeholder()"
      [attr.id]="id() ?? null"
      [attr.name]="name() ?? null"
      [disabled]="disabled()"
      [attr.required]="required() || null"
      [attr.readonly]="readonly() || null"
    />
  `
})
export class Input {
  inverted = input(false);
  placeholder = input('');
  type = input('text');
  id = input<string>();
  name = input<string>();
  value = input<string>();
  disabled = input(false);
  required = input(false);
  readonly = input(false);
}
