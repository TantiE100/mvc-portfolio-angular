import { Component, input } from '@angular/core';
import { Service } from '../core/models';

@Component({
  selector: 'app-services',
  template: `
    <section id="services" class="services section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Servicios</h2>
        <p>Lo que hoy puedo aportar a un equipo o a un proyecto propio.</p>
      </div>

      <div class="container">
        <div class="row gy-4">
          @for (service of services(); track service.title; let i = $index) {
            <div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" [attr.data-aos-delay]="100 * (i + 1)">
              <div class="icon flex-shrink-0" [class.with-logo]="service.logo_path">
                @if (service.logo_path) {
                  <img [src]="service.logo_path" [alt]="service.title" />
                } @else {
                  <i [class]="service.icon"></i>
                }
              </div>
              <div>
                <h4 class="title">{{ service.title }}</h4>
                <p class="description">{{ service.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .icon.with-logo {
      width: 64px;
      height: 64px;
      background: #fff;
      border-color: color-mix(in srgb, var(--accent-color), transparent 70%);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      img {
        width: 32px;
        height: 32px;
        transition: transform 0.3s;
      }
    }
    .service-item:hover .icon.with-logo img {
      transform: scale(1.15);
    }
  `,
})
export class Services {
  readonly services = input.required<Service[]>();
}
