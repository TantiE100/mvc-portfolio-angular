import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { Profile, ResumeItem } from '../core/models';

@Component({
  selector: 'app-resume',
  template: `
    <section id="resume" class="resume section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Currículum</h2>
        <p>Formación y experiencia práctica, leídas directamente desde la base de datos.</p>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 class="resume-title">Resumen</h3>
            <div class="resume-item pb-0">
              <h4>{{ profile().full_name }}</h4>
              <p><em>{{ profile().about_intro }}</em></p>
              <ul>
                <li>{{ profile().address }}</li>
                <li>{{ profile().phone }}</li>
                <li>{{ profile().email }}</li>
              </ul>
            </div>

            <h3 class="resume-title">Formación</h3>
            @for (item of education(); track item.title) {
              <ng-container *ngTemplateOutlet="resumeItem; context: { $implicit: item }" />
            }
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h3 class="resume-title">Experiencia</h3>
            @for (item of experience(); track item.title) {
              <ng-container *ngTemplateOutlet="resumeItem; context: { $implicit: item }" />
            }
          </div>
        </div>
      </div>
    </section>

    <ng-template #resumeItem let-item>
      <div class="resume-item">
        <h4>{{ item.title }}</h4>
        <h5>{{ item.period }}</h5>
        <p><em>{{ item.place }}</em></p>
        @if (item.body) {
          <p class="pre-line">{{ item.body }}</p>
        }
        @if (item.bullets.length) {
          <ul>
            @for (bullet of item.bullets; track $index) {
              <li>{{ bullet }}</li>
            }
          </ul>
        }
      </div>
    </ng-template>
  `,
  imports: [NgTemplateOutlet],
})
export class Resume {
  readonly profile = input.required<Profile>();
  readonly education = input.required<ResumeItem[]>();
  readonly experience = input.required<ResumeItem[]>();
}
