import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'ui-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Toolbar.css',
  template: `
    <div
      role="toolbar"
      [attr.aria-orientation]="orientation()"
      class="toolbar"
      [class.toolbar--horizontal]="orientation() === 'horizontal'"
      [class.toolbar--vertical]="orientation() === 'vertical'"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class Toolbar {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
}
