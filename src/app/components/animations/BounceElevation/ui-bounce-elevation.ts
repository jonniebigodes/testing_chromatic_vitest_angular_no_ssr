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
  selector: 'ui-bounce-elevation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './BounceElevation.css',
  template: `
    <div class="bounce-elevation">
      <div
        class="bounce-elevation__shadow"
        [style.opacity]="shadowOpacity()"
        [style.transform]="'scaleX(' + shadowScaleX() + ')'"
      ></div>
      <div class="bounce-elevation__box" [style.transform]="'translateY(' + y() + 'px)'">
        <div class="bounce-elevation__inner"></div>
      </div>
    </div>
  `
})
export class BounceElevation implements OnInit, OnDestroy, OnChanges {
  liftPx = input(36);
  cycleMs = input(1400);

  protected y = signal(0);
  protected shadowOpacity = signal(0.18);
  protected shadowScaleX = signal(0.85);

  private raf = 0;
  private start = 0;

  private easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  private easeBounceOut(t: number) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) { const u = t - 1.5 / d1; return n1 * u * u + 0.75; }
    if (t < 2.5 / d1) { const u = t - 2.25 / d1; return n1 * u * u + 0.9375; }
    const u = t - 2.625 / d1;
    return n1 * u * u + 0.984375;
  }

  private tick = (now: number) => {
    const liftDuration = this.cycleMs() * 0.42;
    const fallDuration = this.cycleMs() * 0.58;
    const elapsed = (now - this.start) % this.cycleMs();
    let yVal: number;
    if (elapsed < liftDuration) {
      yVal = -this.liftPx() * this.easeOutCubic(elapsed / liftDuration);
    } else {
      const b = this.easeBounceOut((elapsed - liftDuration) / fallDuration);
      yVal = -this.liftPx() + this.liftPx() * b;
    }
    this.y.set(yVal);
    const ratio = this.liftPx() > 0 ? -yVal / this.liftPx() : 0;
    this.shadowOpacity.set(0.18 + ratio * 0.22);
    this.shadowScaleX.set(0.85 + ratio * 0.18);
    this.raf = requestAnimationFrame(this.tick);
  };

  private startAnimation() {
    cancelAnimationFrame(this.raf);
    this.start = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
  }

  ngOnChanges(changes: SimpleChanges) {
    const cycleChanged = changes['cycleMs'] && !changes['cycleMs'].isFirstChange();
    const liftChanged = changes['liftPx'] && !changes['liftPx'].isFirstChange();
    if (cycleChanged || liftChanged) {
      this.startAnimation();
    }
  }
}
