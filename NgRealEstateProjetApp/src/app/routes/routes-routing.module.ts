import { NotFoundComponent } from "./../components/not-found/not-found.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "../theme/admin-layout/admin-layout.component";
import { AuthGuard } from "@core/guards/auth.guard";
import { RoleGuard } from "@core/guards/role.guards";
import { Role } from "@shared/models/role.model";

const routes: Routes = [
  {
    path: "login",
    // canActivate:[LoginGuard],
    loadChildren: () =>
      import("../components/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "not-found",
    component: NotFoundComponent,
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
          import("../components/find-agent/find-agent.module").then(
            (m) => m.FindAgentModule
          ),
      },
      {
        path: "sponsorship",
        canActivate: [RoleGuard, AuthGuard],
        data: {
          title: "sponsorship",
          titleI18n: "sponsorship",
          roles: [Role.User],
        },
        loadChildren: () =>
          import("../components/sponsor/sponsor.module").then(
            (m) => m.SponsorModule
          ),
      },

      {
        path: "sponsor-admin",
        canActivate: [RoleGuard, AuthGuard],
        data: {
          title: "sponsorship",
          titleI18n: "sponsorship-admin",
          roles: [Role.Admin],
        },
        loadChildren: () =>
          import("../components/sponsor-admin/sponsor-admin.module").then(
            (m) => m.SponsorAdminModule
          ),
      },
      {
        path: "project",
        canActivate: [RoleGuard, AuthGuard],
        data: { title: "project", titleI18n: "project", roles: [Role.User] },
        loadChildren: () =>
          import("../components/project/project.module").then(
            (m) => m.ProjectModule
          ),
      },
      {
        path: "contact",
        canActivate: [RoleGuard, AuthGuard],
        data: { title: "contact", titleI18n: "contact", roles: [Role.User] },
        loadChildren: () =>
          import("../components/contact/contact.module").then(
            (m) => m.ContactModule
          ),
      },
      {
        path: "profil",
        canActivate: [RoleGuard, AuthGuard],
        data: {
          title: "profil",
          titleI18n: "profil",
          roles: [Role.User, Role.Admin],
        },
        loadChildren: () =>
          import("../components/profil/profil.module").then(
            (m) => m.ProfilModule
          ),
      },
      {
        path: "mandat-admin",
        canActivate: [RoleGuard, AuthGuard],
        data: {
          title: "mandat-admin",
          titleI18n: "mandat-admin",
          roles: [Role.Admin],
        },
        loadChildren: () =>
          import("../components/mandat-admin/mandat-admin.module").then(
            (m) => m.MandatAdminModule
          ),
      },
      {
        path: "mandat",
        canActivate: [RoleGuard, AuthGuard],
        data: { title: "mandat", titleI18n: "mandat", roles: [Role.User] },
        loadChildren: () =>
          import("../components/mandat/mandat.module").then(
            (m) => m.MandatModule
          ),
      },
      {
        path: "transaction",
        canActivate: [RoleGuard, AuthGuard],
        data: {
          title: "transaction",
          titleI18n: "transaction",
          roles: [Role.User],
        },
        loadChildren: () =>
          import("../components/transaction/transaction.module").then(
            (m) => m.TransactionModule
          ),
      },
      {
        path: "transaction-admin",
        canActivate: [RoleGuard, AuthGuard],
        data: {
          title: "transaction-admin",
          titleI18n: "transaction-admin",
          roles: [Role.Admin],
        },
        loadChildren: () =>
          import(
            "../components/transaction-admin/transaction-admin.module"
          ).then((m) => m.TransactionAdminModule),
      },
    ],
  },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
