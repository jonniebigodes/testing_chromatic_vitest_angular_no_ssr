import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';

interface SpringConfig {
  target: number;
  damping: number;
  stiffness: number;
}

@Component({
  selector: 'ui-spring-oscillator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './SpringOscillator.css',
  template: `
    <div class="spring-oscillator">
      <div class="spring-oscillator__track">
        <div
          class="spring-oscillator__knob"
          [style.transform]="'translateX(' + x() + 'px)'"
        ></div>
      </div>
    </div>
  `
})
export class SpringOscillator implements OnInit, OnDestroy {
  spanPx = input(56);

  protected x = signal(0);

  private raf = 0;
  private position = 0;
  private velocity = 0;
  private stepIndex = 0;
  private lastTime = 0;

  private tick = (now: number) => {
    const sequence: SpringConfig[] = [
      { target: this.spanPx(), damping: 8, stiffness: 140 },
      { target: -this.spanPx(), damping: 8, stiffness: 140 },
      { target: 0, damping: 12, stiffness: 180 },
    ];
    const dt = Math.min((now - this.lastTime) / 1000, 1 / 30);
    this.lastTime = now;
    const cfg = sequence[this.stepIndex];
    const force = -cfg.stiffness * (this.position - cfg.target) - cfg.damping * this.velocity;
    this.velocity += force * dt;
    this.position += this.velocity * dt;
    const settled =
      Math.abs(this.position - cfg.target) < 0.5 && Math.abs(this.velocity) < 0.5;
    if (settled) {
      this.position = cfg.target;
      this.velocity = 0;
      this.stepIndex = (this.stepIndex + 1) % sequence.length;
    }
    this.x.set(this.position);
    this.raf = requestAnimationFrame(this.tick);
  };

  ngOnInit() {
    this.position = 0;
    this.velocity = 0;
    this.stepIndex = 0;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
  }
}
