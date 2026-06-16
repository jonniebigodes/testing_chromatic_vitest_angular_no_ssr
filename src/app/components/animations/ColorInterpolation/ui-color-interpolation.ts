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
  selector: 'ui-color-interpolation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './ColorInterpolation.css',
  template: `
    <div class="color-interpolation">
      <div
        class="color-interpolation__swatch"
        [style.background-color]="backgroundColor()"
      ></div>
    </div>
  `
})
export class ColorInterpolation implements OnInit, OnDestroy, OnChanges {
  durationMs = input(3200);

  protected backgroundColor = signal('#4f46e5');

  private raf = 0;
  private start = 0;

  private hexToRgb(hex: string): [number, number, number] {
    const v = hex.replace('#', '');
    return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
  }

  private lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  private interpolateColor(value: number, inputRange: number[], colors: string[]) {
    if (value <= inputRange[0]) return colors[0];
    if (value >= inputRange[inputRange.length - 1]) return colors[colors.length - 1];
    for (let i = 0; i < inputRange.length - 1; i++) {
      if (value >= inputRange[i] && value <= inputRange[i + 1]) {
        const t = (value - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
        const [r1, g1, b1] = this.hexToRgb(colors[i]);
        const [r2, g2, b2] = this.hexToRgb(colors[i + 1]);
        return `rgb(${Math.round(this.lerp(r1, r2, t))}, ${Math.round(this.lerp(g1, g2, t))}, ${Math.round(this.lerp(b1, b2, t))})`;
      }
    }
    return colors[0];
  }

  private tick = (now: number) => {
    const period = this.durationMs() * 2;
    const elapsed = (now - this.start) % period;
    const p = elapsed < this.durationMs()
      ? elapsed / this.durationMs()
      : 1 - (elapsed - this.durationMs()) / this.durationMs();
    this.backgroundColor.set(
      this.interpolateColor(p, [0, 0.33, 0.66, 1], ['#4f46e5', '#ec4899', '#f59e0b', '#10b981'])
    );
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
    if (changes['durationMs'] && !changes['durationMs'].isFirstChange()) {
      this.startAnimation();
    }
  }
}
