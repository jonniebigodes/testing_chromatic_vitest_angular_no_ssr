import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'my-element',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <ng-content></ng-content>
      <button type="button" (click)="count.update(n => n + 1)">
        Count is {{ count() }}
      </button>
    </section>
  `
})
export class MyElement {
  count = signal(0);
}
