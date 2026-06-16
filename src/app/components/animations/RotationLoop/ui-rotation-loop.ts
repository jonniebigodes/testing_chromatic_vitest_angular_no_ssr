import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'ui-rotation-loop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './RotationLoop.css',
  template: `
    <div class="rotation-loop">
      <div class="rotation-loop__box" [style.animation-duration]="durationMs() + 'ms'">
        <div class="rotation-loop__dot"></div>
      </div>
    </div>
  `
})
export class RotationLoop {
  durationMs = input(3200);
}
