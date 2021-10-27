import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@shared/services/boostrap/settings.service';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button class="hiit-toolbar-button" [matMenuTriggerFor]="menu" >
      <mat-icon >translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue" (click)="useLanguage(lang.key)">
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .flag-icon {
        margin-right: 8px;
      }
    `,
  ],
})
export class TranslateComponent {
  langs = {
    'en-US': 'English',
    'fr-FR': 'Francais',
    
  };

  constructor(public translate: TranslateService, private settings: SettingsService) {
    translate.addLangs(['en-US', 'fr-FR']);
    translate.setDefaultLang('fr-FR');

    const browserLang = navigator.language;
    translate.use(browserLang.match(/en-US|fr-FR/) ? browserLang : 'en-US');
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
  }
}
