import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  AfterViewInit,
} from '@angular/core';

interface AccordionItem {
  title: string;
  content: string;
}

@Component({
  selector: 'ui-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Accordion.css',
  template: `
    <div class="accordion" [class.accordion--inverted]="inverted()">
      @for (item of items(); track $index) {
        <div class="accordion__item">
          <button
            type="button"
            [id]="'accordion-trigger-' + $index"
            class="accordion__trigger"
            [attr.aria-expanded]="isOpen($index)"
            [attr.aria-controls]="'accordion-content-' + $index"
            (click)="toggleItem($index)"
          >
            <span>{{ item.title }}</span>
            <span class="accordion__chevron" [class.accordion__chevron--open]="isOpen($index)">▼</span>
          </button>
          @if (isOpen($index)) {
            <div
              [id]="'accordion-content-' + $index"
              role="region"
              [attr.aria-labelledby]="'accordion-trigger-' + $index"
              class="accordion__content"
            >
              {{ item.content }}
            </div>
          }
        </div>
      }
    </div>
  `
})
export class Accordion implements AfterViewInit {
  items = input<AccordionItem[]>([]);
  inverted = input(false);

  protected openItems = signal<string[]>([]);

  protected isOpen(index: number) {
    return this.openItems().includes(`item-${index}`);
  }

  ngAfterViewInit() {
    if (this.items().length > 0) {
      this.openItems.set(['item-0']);
    }
  }

  protected toggleItem(index: number) {
    const value = `item-${index}`;
    this.openItems.update(current =>
      current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
    );
  }
}
