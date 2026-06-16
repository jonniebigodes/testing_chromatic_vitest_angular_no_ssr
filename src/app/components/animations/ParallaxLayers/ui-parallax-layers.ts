import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ui-parallax-layers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './ParallaxLayers.css',
  template: `
    <div class="parallax-layers">
      <div
        class="parallax-layers__viewport"
        [class.parallax-layers__viewport--horizontal]="axis() === 'horizontal'"
        [class.parallax-layers__viewport--vertical]="axis() === 'vertical'"
      >
        <div
          class="parallax-layers__layer parallax-layers__layer--back"
          [style.transform]="backTransform()"
        ></div>
        <div
          class="parallax-layers__layer parallax-layers__layer--mid"
          [style.transform]="midTransform()"
        ></div>
        <div
          class="parallax-layers__layer parallax-layers__layer--front"
          [style.transform]="frontTransform()"
        ></div>
      </div>
    </div>
  `
})
export class ParallaxLayers implements OnInit, OnDestroy, OnChanges {
  axis = input<'horizontal' | 'vertical'>('horizontal');
  durationMs = input(5000);

  protected progress = signal(0);

  protected backTransform = computed(() => this.translate(this.axis() === 'horizontal' ? [-26, 26] : [-18, 18]));
  protected midTransform = computed(() => this.translate(this.axis() === 'horizontal' ? [-44, 44] : [-32, 32]));
  protected frontTransform = computed(() => this.translate(this.axis() === 'horizontal' ? [-62, 62] : [-46, 46]));

  private raf = 0;
  private start = 0;

  private lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  private translate(range: [number, number]) {
    const v = this.lerp(range[0], range[1], this.progress());
    return this.axis() === 'horizontal' ? `translateX(${v}px)` : `translateY(${v}px)`;
  }

  private tick = (now: number) => {
    const period = this.durationMs() * 2;
    const elapsed = (now - this.start) % period;
    this.progress.set(
      elapsed < this.durationMs()
        ? elapsed / this.durationMs()
        : 1 - (elapsed - this.durationMs()) / this.durationMs()
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
