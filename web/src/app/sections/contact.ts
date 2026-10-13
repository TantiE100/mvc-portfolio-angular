import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Profile } from '../core/models';
import { PortfolioApi } from '../core/portfolio-api';

type Status = 'idle' | 'loading' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    @let p = profile();
    <section id="contact" class="contact section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Contacto</h2>
        <p>Los mensajes enviados desde este formulario se guardan en la tabla <code>contact_messages</code>.</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg-5">
            <div class="info-wrap">
              @if (p.city_image_path) {
                <img [src]="p.city_image_path" [alt]="p.city" class="city-photo" loading="lazy" />
              }
              <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i class="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Ubicación</h3>
                  <p>{{ p.address }}</p>
                </div>
              </div>

              <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i class="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Teléfono</h3>
                  <p>{{ p.phone }}</p>
                </div>
              </div>

              <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i class="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Correo</h3>
                  <p>{{ p.email }}</p>
                </div>
              </div>

              @if (mapUrl(); as url) {
                <iframe
                  [src]="url"
                  [title]="'Mapa de ' + p.city"
                  style="border: 0; width: 100%; height: 270px"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              }
            </div>
          </div>

          <div class="col-lg-7">
            <form [formGroup]="form" (ngSubmit)="submit()" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div class="row gy-4">
                <div class="col-md-6">
                  <label for="name-field" class="pb-2">Tu nombre</label>
                  <input type="text" formControlName="name" id="name-field" class="form-control" required />
                </div>

                <div class="col-md-6">
                  <label for="email-field" class="pb-2">Tu correo</label>
                  <input type="email" formControlName="email" id="email-field" class="form-control" required />
                </div>

                <div class="col-md-12">
                  <label for="subject-field" class="pb-2">Asunto</label>
                  <input type="text" formControlName="subject" id="subject-field" class="form-control" required />
                </div>

                <div class="col-md-12">
                  <label for="message-field" class="pb-2">Mensaje</label>
                  <textarea formControlName="message" rows="10" id="message-field" class="form-control" required></textarea>
                </div>

                <div class="col-md-12 text-center">
                  @switch (status()) {
                    @case ('loading') {
                      <div class="loading d-block">Enviando</div>
                    }
                    @case ('error') {
                      <div class="error-message d-block">{{ error() }}</div>
                    }
                    @case ('sent') {
                      <div class="sent-message d-block">Tu mensaje fue guardado. ¡Gracias!</div>
                    }
                  }
                  <button type="submit" [disabled]="status() === 'loading'">Enviar mensaje</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .city-photo {
      display: block;
      width: 100%;
      height: 190px;
      margin-bottom: 24px;
      object-fit: cover;
      border-radius: 6px;
    }
  `,
})
export class Contact {
  readonly profile = input.required<Profile>();

  private readonly api = inject(PortfolioApi);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly status = signal<Status>('idle');
  protected readonly error = signal('');

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  protected readonly mapUrl = computed(() => {
    const { latitude: lat, longitude: lon, map_span: span } = this.profile();
    if (lat === null || lon === null) return null;
    const bbox = [lon - span, lat - span / 2, lon + span, lat + span / 2].join(',');
    const url =
      'https://www.openstreetmap.org/export/embed.html?bbox=' +
      encodeURIComponent(bbox) +
      '&layer=mapnik&marker=' +
      encodeURIComponent(`${lat},${lon}`);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('error');
      this.error.set(this.form.controls.email.invalid && this.form.controls.email.value
        ? 'El correo electrónico no es válido.'
        : 'Faltan campos obligatorios.');
      return;
    }

    this.status.set('loading');
    this.api.sendContact(this.form.getRawValue()).subscribe({
      next: () => {
        this.status.set('sent');
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.status.set('error');
        this.error.set(err.error?.error ?? 'No se pudo enviar el mensaje. Inténtalo más tarde.');
      },
    });
  }
}
