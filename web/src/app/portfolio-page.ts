import { Component, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import AOS from 'aos';
import { NavLink, PortfolioData } from './core/models';
import { Footer } from './layout/footer';
import { Sidebar } from './layout/sidebar';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Hero } from './sections/hero';
import { Portfolio } from './sections/portfolio';
import { Resume } from './sections/resume';
import { Services } from './sections/services';
import { Skills } from './sections/skills';
import { Stats } from './sections/stats';

/** Equivalente a Views/portfolio/index.php: arma la página con un componente por sección. */
@Component({
  selector: 'app-portfolio-page',
  imports: [Sidebar, Hero, About, Stats, Skills, Resume, Portfolio, Services, Contact, Footer],
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    @let d = data();
    <app-sidebar [profile]="d.profile" [socials]="d.socials" [links]="navLinks()" />

    <main class="main">
      <app-hero [profile]="d.profile" />
      <app-about [profile]="d.profile" />
      <app-stats [stats]="d.stats" />
      <app-skills [skills]="d.skills" />
      <app-resume [profile]="d.profile" [education]="d.education" [experience]="d.experience" />
      @if (d.portfolio.length) {
        <app-portfolio [items]="d.portfolio" [categories]="d.portfolioCategories" />
      }
      <app-services [services]="d.services" />
      <app-contact [profile]="d.profile" />
    </main>

    <app-footer [fullName]="d.profile.full_name" />

    <a
      href="#"
      id="scroll-top"
      class="scroll-top d-flex align-items-center justify-content-center"
      [class.active]="showScrollTop()"
      (click)="$event.preventDefault(); scrollToTop()"
      aria-label="Volver arriba"
      ><i class="bi bi-arrow-up-short"></i
    ></a>
  `,
})
export class PortfolioPage {
  readonly data = input.required<PortfolioData>();
  protected readonly showScrollTop = signal(false);

  protected readonly navLinks = computed<NavLink[]>(() => [
    { href: '#hero', icon: 'bi bi-house', label: 'Inicio' },
    { href: '#about', icon: 'bi bi-person', label: 'Sobre mí' },
    { href: '#skills', icon: 'bi bi-bar-chart', label: 'Habilidades' },
    { href: '#resume', icon: 'bi bi-file-earmark-text', label: 'Currículum' },
    ...(this.data().portfolio.length ? [{ href: '#portfolio', icon: 'bi bi-images', label: 'Portafolio' }] : []),
    { href: '#services', icon: 'bi bi-hdd-stack', label: 'Servicios' },
    { href: '#contact', icon: 'bi bi-envelope', label: 'Contacto' },
  ]);

  constructor() {
    const title = inject(Title);
    const meta = inject(Meta);

    afterNextRender(() => {
      const { full_name, headline } = this.data().profile;
      title.setTitle(`${full_name} - Portafolio`);
      meta.updateTag({ name: 'description', content: headline });
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });

      // El contenido llega por HTTP, así que el navegador no encuentra el ancla al cargar.
      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView();
      }
    });
  }

  protected onScroll(): void {
    this.showScrollTop.set(window.scrollY > 100);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
