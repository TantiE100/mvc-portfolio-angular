import { Component, input, signal } from '@angular/core';
import { InView } from './in-view';

@Component({
  selector: 'app-count-up',
  hostDirectives: [{ directive: InView, outputs: ['appInView'] }],
  host: { '(appInView)': 'start()' },
  template: `{{ current() }}`,
})
export class CountUp {
  readonly end = input.required<number>();
  readonly duration = input(1000);
  protected readonly current = signal(0);

  protected start(): void {
    const begin = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - begin) / this.duration(), 1);
      this.current.set(Math.round(this.end() * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
