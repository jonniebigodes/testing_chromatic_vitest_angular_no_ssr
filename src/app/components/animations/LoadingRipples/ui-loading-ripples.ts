import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

@Component({
  selector: 'ui-loading-ripples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './LoadingRipples.css',
  template: `
    <div class="loading-ripples">
      <div class="loading-ripples__container">
        @for (ring of rings(); track ring.index) {
          <div
            class="loading-ripples__ring"
            [style.border-color]="color()"
            [style.animation-duration]="cycleMs() + 'ms'"
            [style.animation-delay]="ring.delay + 'ms'"
          ></div>
        }
      </div>
    </div>
  `
})
export class LoadingRipples {
  ringCount = input(3);
  cycleMs = input(2400);
  color = input('#3b82f6');

  protected rings = computed(() =>
    Array.from({ length: this.ringCount() }, (_, i) => ({
      index: i,
      delay: -(i / this.ringCount()) * this.cycleMs(),
    }))
  );
}
