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

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

@Component({
  selector: 'ui-scramble-text-reveal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './ScrambleTextReveal.css',
  template: `
    <div class="scramble-text-reveal">
      <div class="scramble-text-reveal__content">
        <span class="scramble-text-reveal__text">{{ display() }}</span>
        <span class="scramble-text-reveal__cursor" aria-hidden="true"></span>
      </div>
    </div>
  `
})
export class ScrambleTextReveal implements OnInit, OnDestroy, OnChanges {
  words = input<string[]>();
  wordHoldMs = input(2200);
  scrambleTickMs = input(45);

  protected display = signal('Hello');

  private effectiveWords = computed(() => this.words() ?? ['Hello', 'Storybook', 'Reanimated']);

  private wordIndex = 0;
  private cycleTimer = 0;
  private scrambleTimer = 0;

  private randomChar() {
    return CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? 'X';
  }

  private advanceWord() {
    const words = this.effectiveWords();
    const next = words[(this.wordIndex + 1) % words.length] ?? '';
    this.wordIndex += 1;
    let step = 0;
    const steps = Math.max(next.length * 2, 14);
    clearInterval(this.scrambleTimer);
    this.scrambleTimer = window.setInterval(() => {
      step += 1;
      if (step >= steps) {
        clearInterval(this.scrambleTimer);
        this.display.set(next);
        return;
      }
      const revealCount = Math.min(Math.floor((step / steps) * next.length), next.length);
      const chars = next.split('');
      this.display.set(
        chars
          .map((ch, i) => {
            if (i < revealCount) return ch;
            if (ch === ' ') return ' ';
            return this.randomChar();
          })
          .join('')
      );
    }, this.scrambleTickMs());
  }

  private startCycle() {
    clearInterval(this.cycleTimer);
    clearInterval(this.scrambleTimer);
    this.wordIndex = 0;
    this.display.set(this.effectiveWords()[0] ?? 'Hello');
    this.cycleTimer = window.setInterval(() => this.advanceWord(), this.wordHoldMs());
  }

  ngOnInit() {
    this.startCycle();
  }

  ngOnDestroy() {
    clearInterval(this.cycleTimer);
    clearInterval(this.scrambleTimer);
  }

  ngOnChanges(changes: SimpleChanges) {
    const holdChanged = changes['wordHoldMs'] && !changes['wordHoldMs'].isFirstChange();
    const tickChanged = changes['scrambleTickMs'] && !changes['scrambleTickMs'].isFirstChange();
    const wordsChanged = changes['words'] && !changes['words'].isFirstChange();
    if (holdChanged || tickChanged || wordsChanged) {
      this.startCycle();
    }
  }
}
