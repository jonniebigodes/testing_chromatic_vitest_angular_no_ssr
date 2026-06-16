import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

type AvatarStatus = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'ui-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Avatar.css',
  template: `
    <div class="avatar">
      @if (!showImage()) {
        <span>{{ fallback() }}</span>
      }
      @if (src()) {
        <img
          [src]="src()"
          [alt]="alt() ?? ''"
          class="avatar__image"
          [class.avatar__image--visible]="status() === 'loaded'"
          [class.avatar__image--hidden]="status() !== 'loaded'"
          (load)="updateStatus('loaded')"
          (error)="updateStatus('error')"
        />
      }
    </div>
  `
})
export class Avatar implements OnChanges {
  src = input<string>();
  alt = input<string>();
  fallback = input('');
  statusChange = output<{ status: AvatarStatus }>();

  protected status = signal<AvatarStatus>('loading');
  protected showImage = computed(() => !!this.src() && this.status() !== 'error');

  ngOnChanges(changes: SimpleChanges) {
    if ('src' in changes) {
      const next: AvatarStatus = this.src() ? 'loading' : 'error';
      this.status.set(next);
      this.statusChange.emit({ status: next });
    }
  }

  protected updateStatus(next: AvatarStatus) {
    this.status.set(next);
    this.statusChange.emit({ status: next });
  }
}
