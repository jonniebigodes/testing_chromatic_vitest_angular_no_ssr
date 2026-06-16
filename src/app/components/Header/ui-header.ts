import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import type { HeaderLink } from './Header.types';

@Component({
  selector: 'ui-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Header.css',
  template: `
    <header
      class="header"
      [class.header--sticky]="isSticky()"
      [class.header--relative]="!isSticky()"
      [class.header--inverted]="inverted()"
    >
      <div class="header__inner" [class.header__inner--full-width]="fullWidth()">
        <div class="header__brand">
          @if (logo()) {
            <img class="header__logo" [src]="logo()" alt="Logo" />
          }
          <h1 class="header__title">{{ title() }}</h1>
        </div>
        @if (links().length > 0) {
          <nav class="header__nav">
            @for (link of links(); track link.href) {
              <a class="header__link" [href]="link.href" (click)="linkClick.emit(link)">
                {{ link.label }}
              </a>
            }
          </nav>
        }
      </div>
    </header>
  `
})
export class Header {
  title = input('Application');
  links = input<HeaderLink[]>([]);
  isSticky = input(false);
  inverted = input(false);
  logo = input<string>();
  fullWidth = input(false);
  linkClick = output<HeaderLink>();
}
