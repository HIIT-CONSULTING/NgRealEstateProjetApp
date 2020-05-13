import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'annuaire', pathMatch: 'full' },
      { path: 'annuaire',data: { title: 'annuaire', titleI18n: 'annuaire' }, loadChildren: () => import('./find-agent/find-agent.module').then(m => m.FindAgentModule)},
     { path: 'sponsorship', data: { title: 'sponsorship', titleI18n: 'sponsorship' }, loadChildren: () => import('./sponsor/sponsor.module').then(m => m.SponsorModule)},
 
    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { title: 'Login', titleI18n: 'login' } },
    ],
  },
  { path: '**', redirectTo: 'annuaire' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}