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
       },
       {
        path: "profil",
        canActivate: [RoleGuard,AuthGuard],
        data: { title: "profil", titleI18n: "profil",roles: [Role.User,Role.Admin] },
        loadChildren: () =>
          import("./profil/profil.module").then((m) => m.ProfilModule),
        },
        {
          path: "mandat-admin",
          canActivate: [RoleGuard,AuthGuard],
          data: { title: "mandat-admin", titleI18n: "mandat-admin",roles: [Role.Admin]},
          loadChildren: () => import("./mandat-admin/mandat-admin.module").then((m) => m.MandatAdminModule),
         },
         {
          path: "mandat",
          canActivate: [RoleGuard,AuthGuard],
          data: { title: "mandat", titleI18n: "mandat",roles: [Role.User]},
          loadChildren: () => import("./mandat/mandat.module").then((m) => m.MandatModule),
         },
         {
          path: "transaction",
          canActivate: [RoleGuard,AuthGuard],
          data: { title: "transaction", titleI18n: "transaction",roles: [Role.User]},
          loadChildren: () => import("./transaction/transaction.module").then((m) => m.TransactionModule),
         },
        

    ]
  },
  // { path: '**', redirectTo: 'annuaire' },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
