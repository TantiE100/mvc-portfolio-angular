import { Component, input, signal } from '@angular/core';
import { NavLink, Profile, SocialLink } from '../core/models';

@Component({
  selector: 'app-sidebar',
  host: { '(window:scroll)': 'scrollspy()' },
  template: `
    <header id="header" class="header dark-background d-flex flex-column" [class.header-show]="open()">
      <i
        class="header-toggle d-xl-none bi"
        [class.bi-list]="!open()"
        [class.bi-x]="open()"
        (click)="open.set(!open())"
      ></i>

      <div class="profile-img">
        <img [src]="profile().avatar_path" [alt]="profile().full_name" class="img-fluid rounded-circle" />
      </div>

      <a href="#hero" class="logo d-flex align-items-center justify-content-center">
        <h1 class="sitename">{{ profile().full_name }}</h1>
      </a>

      <div class="social-links text-center">
        @for (social of socials(); track social.url) {
          <a [href]="social.url" [class]="social.css_class" target="_blank" rel="noopener">
            <i [class]="social.icon"></i>
          </a>
        }
      </div>

      <nav id="navmenu" class="navmenu">
        <ul>
          @for (link of links(); track link.href) {
            <li>
              <a [href]="link.href" [class.active]="active() === link.href" (click)="open.set(false)">
                <i [class]="link.icon + ' navicon'"></i> {{ link.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
    </header>
  `,
})
export class Sidebar {
  readonly profile = input.required<Profile>();
  readonly socials = input.required<SocialLink[]>();
  readonly links = input.required<NavLink[]>();

  protected readonly open = signal(false);
  protected readonly active = signal('#hero');

  protected scrollspy(): void {
    const position = window.scrollY + 200;
    for (const link of this.links()) {
      const section = document.querySelector<HTMLElement>(link.href);
      if (section && position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        this.active.set(link.href);
        return;
      }
    }
  }
}
