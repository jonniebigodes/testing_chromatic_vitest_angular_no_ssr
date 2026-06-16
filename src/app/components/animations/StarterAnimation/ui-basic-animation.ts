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
  selector: 'ui-basic-animation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './BasicAnimation.css',
  template: `
    <div class="basic-animation">
      <div class="basic-animation__bar" [style.width]="width() + 'px'"></div>
    </div>
  `
})
export class BasicAnimation implements OnInit, OnDestroy, OnChanges {
  tickMs = input(3000);
  widthMaxPx = input(350);

  protected width = signal(10);

  private intervalId = 0;

  private startInterval() {
    clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      this.width.set(Math.random() * this.widthMaxPx());
    }, this.tickMs());
  }

  ngOnInit() {
    this.startInterval();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  ngOnChanges(changes: SimpleChanges) {
    const tickChanged = changes['tickMs'] && !changes['tickMs'].isFirstChange();
    const widthChanged = changes['widthMaxPx'] && !changes['widthMaxPx'].isFirstChange();
    if (tickChanged || widthChanged) {
      this.startInterval();
    }
  }
}
