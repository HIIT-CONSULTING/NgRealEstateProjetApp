export interface AppSettings {
  navPos?: 'side' | 'top';
  dir?: 'ltr';
  theme?: 'light' ;
  showHeader?: boolean;
  headerPos?: 'fixed' | 'static' | 'above';
  showUserPanel?: boolean;
  sidenavOpened?: boolean;
  sidenavCollapsed?: boolean;
  language?: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'light',
  showHeader: true,
  headerPos: 'above',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'fr-FR',
};
