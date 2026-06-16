import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  viewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ui-fill-text-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './FillTextLoading.css',
  template: `
    <div class="fill-text-loading">
      <span class="fill-text-loading__wrapper">
        <span #baseEl class="fill-text-loading__base">{{ label() }}</span>
        <span class="fill-text-loading__overlay" aria-hidden="true">
          <span
            class="fill-text-loading__progress"
            [style.width]="progressWidth() + 'px'"
          >
            <span class="fill-text-loading__filled">{{ label() }}</span>
          </span>
        </span>
      </span>
    </div>
  `
})
export class FillTextLoading implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  label = input('Loading');
  cycleMs = input(2200);

  protected progressWidth = signal(0);

  private baseEl = viewChild<ElementRef<HTMLSpanElement>>('baseEl');
  private fullWidth = 0;
  private progress = 0;
  private raf = 0;
  private start = 0;
  private ro?: ResizeObserver;

  private easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private tick = (now: number) => {
    const period = this.cycleMs() * 2;
    const elapsed = (now - this.start) % period;
    const linear = elapsed < this.cycleMs()
      ? elapsed / this.cycleMs()
      : 1 - (elapsed - this.cycleMs()) / this.cycleMs();
    this.progress = this.easeInOutCubic(linear);
    this.progressWidth.set(this.fullWidth * this.progress);
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

  ngAfterViewInit() {
    const el = this.baseEl()?.nativeElement;
    if (el) {
      this.fullWidth = el.getBoundingClientRect().width;
      this.ro = new ResizeObserver(() => {
        this.fullWidth = el.getBoundingClientRect().width;
      });
      this.ro.observe(el);
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cycleMs'] && !changes['cycleMs'].isFirstChange()) {
      this.startAnimation();
    }
  }
}
