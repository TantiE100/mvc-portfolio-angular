import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ContactMessage, PortfolioData } from './models';

@Injectable({ providedIn: 'root' })
export class PortfolioApi {
  private readonly http = inject(HttpClient);

  readonly portfolio = httpResource<PortfolioData>(() => '/api/profile');

  sendContact(message: ContactMessage) {
    return this.http.post<{ ok: true }>('/api/contact', message);
  }
}
