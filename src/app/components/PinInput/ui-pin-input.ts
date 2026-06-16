import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  viewChildren,
  ElementRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ui-pin-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './PinInput.css',
  template: `
    <div class="pin-input">
      @if (label()) {
        <label class="pin-input__label">{{ label() }}</label>
      }
      <div class="pin-input__fields">
        @for (idx of indices(); track idx) {
          <input
            #fieldRef
            class="pin-input__field"
            [value]="values()[idx] ?? ''"
            (input)="handleInput($event, idx)"
            (keydown)="handleKeyDown($event, idx)"
            (paste)="handlePaste($event, idx)"
            [disabled]="disabled()"
            [attr.required]="required() || null"
            [placeholder]="placeholder()"
            [type]="mask() ? 'password' : 'text'"
            [attr.inputmode]="type() === 'numeric' ? 'numeric' : 'text'"
            [attr.autocomplete]="otp() ? 'one-time-code' : 'off'"
            [attr.aria-label]="'Digit ' + (idx + 1)"
            maxlength="1"
          />
        }
      </div>
      @if (name()) {
        <input type="hidden" [attr.name]="name()" [value]="values().join('')" />
      }
    </div>
  `
})
export class PinInput implements OnInit {
  value = input<string[]>();
  disabled = input(false);
  maxLength = input(4);
  label = input<string>();
  required = input(false);
  name = input<string>();
  type = input<'numeric' | 'alphabetic' | 'alphanumeric'>('numeric');
  mask = input(false);
  placeholder = input('○');
  otp = input(false);
  valueChange = output<{ value: string[]; valueAsString: string }>();

  private internal = signal<string[]>([]);
  private fieldRefs = viewChildren<ElementRef<HTMLInputElement>>('fieldRef');

  protected indices = computed(() => Array.from({ length: this.maxLength() }, (_, i) => i));

  protected values = computed(() =>
    this.value() !== undefined
      ? this.buildValues(this.value())
      : this.internal()
  );

  private buildValues(source?: string[]) {
    return Array.from({ length: this.maxLength() }, (_, i) => source?.[i] ?? '');
  }

  ngOnInit() {
    this.internal.set(this.buildValues(this.value()));
  }

  private sanitize(raw: string) {
    switch (this.type()) {
      case 'numeric': return raw.replace(/[^0-9]/g, '');
      case 'alphabetic': return raw.replace(/[^a-zA-Z]/g, '');
      default: return raw.replace(/[^a-zA-Z0-9]/g, '');
    }
  }

  private emit(next: string[]) {
    if (this.value() === undefined) this.internal.set([...next]);
    const trimmed = next.filter(char => char !== '');
    this.valueChange.emit({ value: trimmed, valueAsString: next.join('') });
  }

  private focusInput(index: number) {
    const inputs = this.fieldRefs();
    const target = inputs[index];
    if (target) {
      target.nativeElement.focus();
      target.nativeElement.select();
    }
  }

  protected handleInput(e: Event, index: number) {
    const sanitized = this.sanitize((e.target as HTMLInputElement).value);
    const char = sanitized.slice(-1);
    const next = [...this.values()];
    next[index] = char;
    this.emit(next);
    if (char && index < this.maxLength() - 1) this.focusInput(index + 1);
  }

  protected handleKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === 'Backspace') {
      if (!this.values()[index] && index > 0) {
        e.preventDefault();
        const next = [...this.values()];
        next[index - 1] = '';
        this.emit(next);
        this.focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      this.focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < this.maxLength() - 1) {
      e.preventDefault();
      this.focusInput(index + 1);
    }
  }

  protected handlePaste(e: ClipboardEvent, index: number) {
    e.preventDefault();
    const pasted = this.sanitize(e.clipboardData?.getData('text') ?? '');
    if (!pasted) return;
    const next = [...this.values()];
    let cursor = index;
    for (const char of pasted) {
      if (cursor >= this.maxLength()) break;
      next[cursor] = char;
      cursor++;
    }
    this.emit(next);
    this.focusInput(Math.min(cursor, this.maxLength() - 1));
  }
}
