import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Profile } from '../core/models';

@Component({
  selector: 'app-about',
  imports: [DatePipe],
  template: `
    @let p = profile();
    <section id="about" class="about section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Sobre mí</h2>
        <p>{{ p.about_intro }}</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4 justify-content-center">
          <div class="col-lg-4">
            <img [src]="p.avatar_path" class="img-fluid" [alt]="p.full_name" />
          </div>
          <div class="col-lg-8 content">
            <h2>{{ p.headline }}</h2>
            <p class="fst-italic py-3 pre-line">{{ p.about_summary }}</p>
            <div class="row">
              <div class="col-lg-6">
                <ul>
                  <li><i class="bi bi-chevron-right"></i> <strong>Cumpleaños:</strong> <span>{{ p.birth_date | date: "d 'de' MMMM 'de' y" }}</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Sitio web:</strong> <span>{{ p.website }}</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Teléfono:</strong> <span>{{ p.phone }}</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Ciudad:</strong> <span>{{ p.city }}</span></li>
                </ul>
              </div>
              <div class="col-lg-6">
                <ul>
                  <li><i class="bi bi-chevron-right"></i> <strong>Edad:</strong> <span>{{ p.age }}</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Título:</strong> <span>{{ p.degree }}</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Correo:</strong> <span>{{ p.email }}</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>{{ p.freelance }}</span></li>
                </ul>
              </div>
            </div>
            <p class="py-3 pre-line">{{ p.about_extra }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  readonly profile = input.required<Profile>();
}
