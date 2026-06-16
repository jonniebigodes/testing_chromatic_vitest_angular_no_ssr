import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-aspect-ratio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './AspectRatio.css',
  template: `
    <div class="aspect-ratio" [style.padding-bottom]="paddingBottom()">
      <div class="aspect-ratio__inner">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AspectRatio {
  ratio = input(1);

  protected paddingBottom = computed(() => `${(1 / this.ratio()) * 100}%`);
}
