import { Component, computed, input, signal } from '@angular/core';
import { InView } from '../core/in-view';
import { Skill } from '../core/models';

@Component({
  selector: 'app-skills',
  imports: [InView],
  template: `
    <section id="skills" class="skills section light-background">
      <div class="container section-title" data-aos="fade-up">
        <h2>Habilidades</h2>
        <p>Tecnologías con las que trabajo día a día, en la universidad y en mis propios proyectos.</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row skills-content skills-animation" (appInView)="revealed.set(true)">
          @for (column of columns(); track $index) {
            <div class="col-lg-6">
              @for (skill of column; track skill.name) {
                <div class="progress">
                  <span class="skill">
                    <span class="name">
                      @if (skill.logo_path) {
                        <img [src]="skill.logo_path" alt="" class="logo" />
                      }
                      {{ skill.name }}
                    </span> <i class="val">{{ skill.percent }}%</i></span>
                  <div class="progress-bar-wrap">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      [attr.aria-valuenow]="skill.percent"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      [style.width.%]="revealed() ? skill.percent : 0"
                    ></div>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .name {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .logo {
      width: 20px;
      height: 20px;
    }
  `,
})
export class Skills {
  readonly skills = input.required<Skill[]>();
  protected readonly revealed = signal(false);

  protected readonly columns = computed(() => {
    const all = this.skills();
    const half = Math.max(Math.ceil(all.length / 2), 1);
    return [all.slice(0, half), all.slice(half)].filter((c) => c.length > 0);
  });
}
