import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  viewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'ui-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Slider.css',
  template: `
    <div
      class="slider"
      [class.slider--vertical]="orientation() === 'vertical'"
      [class.slider--horizontal]="orientation() === 'horizontal'"
      [class.slider--disabled]="disabled()"
    >
      @if (label()) {
        <span class="slider__label">{{ label() }}</span>
      }
      <span class="slider__value">{{ currentValue() }}</span>
      <div
        role="group"
        class="slider__control"
        [class.slider__control--disabled]="disabled()"
        (pointerdown)="handlePointerDown($event)"
        (pointermove)="handlePointerMove($event)"
        (pointerup)="handlePointerUp($event)"
      >
        <div
          #trackEl
          class="slider__track"
          [class.slider__track--vertical]="orientation() === 'vertical'"
          [class.slider__track--horizontal]="orientation() === 'horizontal'"
        >
          <div
            class="slider__range"
            [class.slider__range--vertical]="orientation() === 'vertical'"
            [class.slider__range--horizontal]="orientation() === 'horizontal'"
            [class.slider__range--disabled]="disabled()"
            [style]="orientation() === 'vertical' ? 'height:' + percent() + '%' : 'width:' + percent() + '%'"
          ></div>
        </div>
        <div
          role="slider"
          [attr.tabindex]="disabled() ? -1 : 0"
          [attr.aria-valuemin]="min()"
          [attr.aria-valuemax]="max()"
          [attr.aria-valuenow]="currentValue()"
          [attr.aria-orientation]="orientation()"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          (keydown)="handleKeyDown($event)"
          class="slider__thumb"
          [class.slider__thumb--vertical]="orientation() === 'vertical'"
          [class.slider__thumb--horizontal]="orientation() === 'horizontal'"
          [class.slider__thumb--disabled]="disabled()"
          [style]="orientation() === 'vertical' ? 'top:' + (100 - percent()) + '%' : 'left:' + percent() + '%'"
        ></div>
      </div>
    </div>
  `
})
export class Slider {
  value = input<number[]>();
  disabled = input(false);
  min = input(0);
  max = input(100);
  step = input(1);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  label = input<string>();
  valueChange = output<{ value: number[] }>();

  private trackEl = viewChild<ElementRef<HTMLDivElement>>('trackEl');

  protected currentValue = computed(() => this.value()?.[0] ?? this.min());

  protected percent = computed(() => {
    const range = this.max() - this.min() || 1;
    return Math.min(100, Math.max(0, ((this.currentValue() - this.min()) / range) * 100));
  });

  private clampVal(v: number) {
    return Math.min(this.max(), Math.max(this.min(), v));
  }

  private snapToStep(raw: number) {
    const steps = Math.round((raw - this.min()) / this.step());
    const snapped = this.min() + steps * this.step();
    return this.clampVal(Number(snapped.toFixed(10)));
  }

  private commit(next: number) {
    if (next === this.currentValue()) return;
    this.valueChange.emit({ value: [next] });
  }

  private valueFromPointer(clientX: number, clientY: number) {
    const el = this.trackEl()?.nativeElement;
    if (!el) return this.currentValue();
    const rect = el.getBoundingClientRect();
    const range = this.max() - this.min() || 1;
    const ratio = this.orientation() === 'vertical'
      ? 1 - (clientY - rect.top) / (rect.height || 1)
      : (clientX - rect.left) / (rect.width || 1);
    return this.snapToStep(this.min() + Math.min(1, Math.max(0, ratio)) * range);
  }

  protected handlePointerDown(e: PointerEvent) {
    if (this.disabled()) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.commit(this.valueFromPointer(e.clientX, e.clientY));
  }

  protected handlePointerMove(e: PointerEvent) {
    if (this.disabled() || !(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
    this.commit(this.valueFromPointer(e.clientX, e.clientY));
  }

  protected handlePointerUp(e: PointerEvent) {
    if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
  }

  protected handleKeyDown(e: KeyboardEvent) {
    if (this.disabled()) return;
    let next = this.currentValue();
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = this.clampVal(this.currentValue() + this.step());
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = this.clampVal(this.currentValue() - this.step());
        break;
      case 'Home':
        next = this.min();
        break;
      case 'End':
        next = this.max();
        break;
      default:
        return;
    }
    e.preventDefault();
    this.commit(this.snapToStep(next));
  }
}
