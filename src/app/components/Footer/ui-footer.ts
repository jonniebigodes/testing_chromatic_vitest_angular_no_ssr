import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'ui-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Footer.css',
  template: `
    <footer class="footer" [class.footer--inverted]="inverted()">
      <div class="footer__inner">
        @if (links().length > 0) {
          <nav class="footer__nav">
            @for (link of links(); track link) {
              <button
                type="button"
                class="footer__link"
                (click)="handleLinkClick(link, $event)"
              >
                {{ link }}
              </button>
            }
          </nav>
        }
        <p class="footer__label">{{ label() }}</p>
      </div>
    </footer>
  `
})
export class Footer {
  label = input('© 2025 Company Name. All rights reserved.');
  links = input<string[]>([]);
  inverted = input(false);
  linkClick = output<string>();

  protected handleLinkClick(link: string, event: MouseEvent) {
    event.preventDefault();
    this.linkClick.emit(link);
  }
}
