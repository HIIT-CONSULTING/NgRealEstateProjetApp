import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "../theme/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "@core/guards/auth.guard";
import { LoginGuard } from '@core/guards/login.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoleGuard } from '@core/guards/role.guards';
import { Role } from '@shared/models/role.model';
import { SponsorAdminComponent } from './sponsor-admin/sponsor-admin.component';
import { CandidateDetailsComponent } from './sponsor-admin/candidate-details/candidate-details.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: "login",
   // canActivate:[LoginGuard],
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule)
  },
  {
    path:"not-found",component:NotFoundComponent
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "annuaire", pathMatch: "full" },
      {
        path: "annuaire",
        data: { title: "annuaire", titleI18n: "annuaire" },
        loadChildren: () =>
          import("./find-agent/find-agent.module").then(
            (m) => m.FindAgentModule
          ),
      },
      {
        path: "sponsorship",
        canActivate: [RoleGuard,AuthGuard],
        data: { title: "sponsorship", titleI18n: "sponsorship",roles: [Role.User] },
        loadChildren: () =>
          import("./sponsor/sponsor.module").then((m) => m.SponsorModule),
      },

      {
        path: "sponsor-admin",
        canActivate: [RoleGuard,AuthGuard],
        data: { title: "sponsorship", titleI18n: "sponsorship-admin",roles: [Role.Admin]},
        loadChildren: () => import("./sponsor-admin/sponsor-admin.module").then((m) => m.SponsorAdminModule),
       },
       {
        path: "project",
        canActivate: [RoleGuard,AuthGuard],
        data: { title: "project", titleI18n: "project",roles: [Role.User] },
        loadChildren: () => import("./project/project.module").then((m) => m.ProjectModule),
       },
       {
        path: "contact",
        canActivate: [RoleGuard,AuthGuard],
        data: { title: "contact", titleI18n: "contact",roles: [Role.User]},
        loadChildren: () => import("./contact/contact.module").then((m) => m.ContactModule),
       }

    ]
  },
  // { path: '**', redirectTo: 'annuaire' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}