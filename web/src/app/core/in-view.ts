import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, output } from '@angular/core';

/** Emite una sola vez cuando el elemento entra en pantalla (reemplaza a Waypoints / PureCounter). */
@Directive({ selector: '[appInView]' })
export class InView {
  readonly threshold = input(0.2);
  readonly appInView = output<void>();

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.appInView.emit();
            observer.disconnect();
          }
        },
        { threshold: this.threshold() },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
