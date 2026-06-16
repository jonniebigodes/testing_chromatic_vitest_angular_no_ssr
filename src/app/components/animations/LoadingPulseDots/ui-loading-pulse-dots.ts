import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

@Component({
  selector: 'ui-loading-pulse-dots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './LoadingPulseDots.css',
  template: `
    <div class="loading-pulse-dots">
      @for (dot of dots(); track dot.index) {
        <div
          class="loading-pulse-dots__dot"
          [style.background-color]="color()"
          [style.animation-duration]="cycleMs() + 'ms'"
          [style.animation-delay]="dot.delay + 'ms'"
        ></div>
      }
    </div>
  `
})
export class LoadingPulseDots {
  dotCount = input(5);
  cycleMs = input(1400);
  color = input('#6366f1');

  protected dots = computed(() =>
    Array.from({ length: this.dotCount() }, (_, i) => ({
      index: i,
      delay: -((i / this.dotCount()) * this.cycleMs()),
    }))
  );
}
