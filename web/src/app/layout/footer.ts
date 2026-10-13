import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer id="footer" class="footer position-relative light-background">
      <div class="container">
        <div class="copyright text-center">
          <p>
            &copy; {{ year }} <strong class="px-1 sitename">{{ fullName() }}</strong>&ngsp;<span>Todos los derechos reservados.</span>
          </p>
        </div>
        <div class="credits">
          Diseñado por <a href="https://bootstrapmade.com/">BootstrapMade</a> |
          <a href="https://bootstrapmade.com/tools/">DevTools</a>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  readonly fullName = input.required<string>();
  protected readonly year = new Date().getFullYear();
}
