import { Component, computed, input, signal } from '@angular/core';
import { PortfolioItem } from '../core/models';

@Component({
  selector: 'app-portfolio',
  host: {
    '(document:keydown.escape)': 'preview.set(null)',
    '(document:keydown.arrowleft)': 'step(-1)',
    '(document:keydown.arrowright)': 'step(1)',
  },
  template: `
    <section id="portfolio" class="portfolio section light-background">
      <div class="container section-title" data-aos="fade-up">
        <h2>Portafolio</h2>
        <p>Proyectos universitarios y personales. Los filtros salen de las categorías guardadas en la tabla.</p>
      </div>

      <div class="container">
        <ul class="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
          <li [class.filter-active]="filter() === null" (click)="filter.set(null)">Todos</li>
          @for (category of categories(); track category) {
            <li [class.filter-active]="filter() === category" (click)="filter.set(category)">
              {{ category }}
            </li>
          }
        </ul>

        <div class="row gy-4" data-aos="fade-up" data-aos-delay="200">
          @for (item of visibleItems(); track item.title) {
            <div class="col-lg-4 col-md-6 portfolio-item">
              <div class="portfolio-content h-100">
                <img [src]="item.image_path" class="img-fluid" [alt]="item.title" />
                <div class="portfolio-info">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                  <a href="#" [title]="item.title" class="preview-link" (click)="$event.preventDefault(); preview.set(item)">
                    <i class="bi bi-zoom-in"></i>
                  </a>
                  @if (item.details_url) {
                    <a [href]="item.details_url" title="Más detalles" class="details-link" target="_blank" rel="noopener"><i class="bi bi-link-45deg"></i></a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    @if (preview(); as item) {
      <div class="lightbox" (click)="preview.set(null)">
        <button type="button" class="nav prev" aria-label="Anterior" (click)="$event.stopPropagation(); step(-1)">
          <i class="bi bi-chevron-left"></i>
        </button>
        <figure (click)="$event.stopPropagation()">
          <img [src]="item.image_path" [alt]="item.title" />
          <figcaption>
            <strong>{{ item.title }}</strong>
            <span>{{ item.description }}</span>
          </figcaption>
        </figure>
        <button type="button" class="nav next" aria-label="Siguiente" (click)="$event.stopPropagation(); step(1)">
          <i class="bi bi-chevron-right"></i>
        </button>
        <button type="button" class="nav close" aria-label="Cerrar" (click)="preview.set(null)">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    }
  `,
  styles: `
    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.94);
      cursor: zoom-out;
    }
    .nav {
      position: absolute;
      border: 0;
      background: none;
      color: #fff;
      font-size: 36px;
      opacity: 0.7;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
    .prev {
      left: 16px;
    }
    .next {
      right: 16px;
    }
    .close {
      top: 12px;
      right: 16px;
      font-size: 26px;
    }
    figure {
      margin: 0;
      text-align: center;
      color: #fff;
      cursor: default;
    }
    figure img {
      max-width: 90vw;
      max-height: 80vh;
    }
    figcaption {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 14px;
      span {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
      }
    }
  `,
})
export class Portfolio {
  readonly items = input.required<PortfolioItem[]>();
  readonly categories = input.required<string[]>();

  protected readonly filter = signal<string | null>(null);
  protected readonly preview = signal<PortfolioItem | null>(null);

  protected readonly visibleItems = computed(() => {
    const filter = this.filter();
    return filter === null ? this.items() : this.items().filter((i) => i.category === filter);
  });

  protected step(delta: number): void {
    const current = this.preview();
    if (current === null) return;
    const items = this.visibleItems();
    const index = items.indexOf(current);
    this.preview.set(items[(index + delta + items.length) % items.length]);
  }
}
