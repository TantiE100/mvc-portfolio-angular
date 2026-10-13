import { Component, inject } from '@angular/core';
import { PortfolioApi } from './core/portfolio-api';
import { PortfolioPage } from './portfolio-page';

@Component({
  selector: 'app-root',
  imports: [PortfolioPage],
  template: `
    @if (api.portfolio.hasValue()) {
      <app-portfolio-page [data]="api.portfolio.value()" />
    } @else if (api.portfolio.error()) {
      <main class="container py-5 text-center">
        <h1 class="display-6">No se pudo cargar el portafolio</h1>
        <p class="lead">Revisa que la API y la base de datos estén levantadas, migradas y con datos.</p>
        <button type="button" class="btn btn-outline-secondary" (click)="api.portfolio.reload()">Reintentar</button>
      </main>
    } @else {
      <div id="preloader"></div>
    }
  `,
})
export class App {
  protected readonly api = inject(PortfolioApi);
}
