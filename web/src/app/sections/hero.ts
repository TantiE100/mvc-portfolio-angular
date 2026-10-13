import { Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';
import Typed from 'typed.js';
import { Profile } from '../core/models';

@Component({
  selector: 'app-hero',
  template: `
    <section id="hero" class="hero section dark-background">
      <img [src]="profile().hero_path" alt="" data-aos="fade-in" />

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <h2>{{ profile().full_name }}</h2>
        <p>Soy <span #typed class="typed"></span></p>
      </div>
    </section>
  `,
})
export class Hero {
  readonly profile = input.required<Profile>();
  private readonly typedEl = viewChild.required<ElementRef<HTMLElement>>('typed');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const typed = new Typed(this.typedEl().nativeElement, {
        strings: this.profile().typed_roles.split(',').map((s) => s.trim()),
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
      });
      destroyRef.onDestroy(() => typed.destroy());
    });
  }
}
