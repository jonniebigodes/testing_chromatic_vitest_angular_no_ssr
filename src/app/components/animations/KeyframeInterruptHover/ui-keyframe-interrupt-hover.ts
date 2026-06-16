import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ui-keyframe-interrupt-hover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './KeyframeInterruptHover.css',
  template: `
    <div class="keyframe-interrupt-hover">
      <span class="keyframe-interrupt-hover__heading">Keyframe (remount)</span>
      @for (k of [enterKey()]; track k) {
        <div class="keyframe-interrupt-hover__card">
          <span class="keyframe-interrupt-hover__card-text">Hover-like</span>
        </div>
      }
      <span class="keyframe-interrupt-hover__heading keyframe-interrupt-hover__heading--spaced">
        Interruptible timing
      </span>
      <div class="keyframe-interrupt-hover__track">
        <div
          class="keyframe-interrupt-hover__bar"
          [style.width]="barWidth() + 'px'"
        ></div>
      </div>
    </div>
  `
})
export class KeyframeInterruptHover implements OnInit, OnDestroy, OnChanges {
  keyframeCycleMs = input(1600);
  interruptCycleMs = input(550);

  protected enterKey = signal(0);
  protected barWidth = signal(48);

  private keyframeInterval = 0;
  private interruptInterval = 0;

  private startIntervals() {
    clearInterval(this.keyframeInterval);
    clearInterval(this.interruptInterval);
    this.keyframeInterval = window.setInterval(() => {
      this.enterKey.update(k => k + 1);
    }, this.keyframeCycleMs());
    this.interruptInterval = window.setInterval(() => {
      this.barWidth.set(56 + Math.random() * 140);
    }, this.interruptCycleMs());
  }

  ngOnInit() {
    this.startIntervals();
  }

  ngOnDestroy() {
    clearInterval(this.keyframeInterval);
    clearInterval(this.interruptInterval);
  }

  ngOnChanges(changes: SimpleChanges) {
    const keyframeChanged = changes['keyframeCycleMs'] && !changes['keyframeCycleMs'].isFirstChange();
    const interruptChanged = changes['interruptCycleMs'] && !changes['interruptCycleMs'].isFirstChange();
    if (keyframeChanged || interruptChanged) {
      this.startIntervals();
    }
  }
}
