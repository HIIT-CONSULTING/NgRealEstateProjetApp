import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="hiit-branding" href="#/">
      <img src="./assets/images/real.jpg" class="hiit-branding-logo-expanded" alt="logo" />
      <span class="hiit-branding-name">RealEstate</span>
    </a>
  `,
})
export class BrandingComponent {}
