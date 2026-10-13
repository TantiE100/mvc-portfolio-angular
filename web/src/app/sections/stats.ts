import { Component, input } from '@angular/core';
import { CountUp } from '../core/count-up';
import { Stat } from '../core/models';

@Component({
  selector: 'app-stats',
  imports: [CountUp],
  template: `
    <section id="stats" class="stats section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          @for (stat of stats(); track stat.label) {
            <div class="col-lg-3 col-md-6">
              <div class="stats-item">
                <i [class]="stat.icon"></i>
                <app-count-up class="purecounter" [end]="stat.value" />
                <p><strong>{{ stat.label }}</strong>&ngsp;<span>{{ stat.caption }}</span></p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Stats {
  readonly stats = input.required<Stat[]>();
}
