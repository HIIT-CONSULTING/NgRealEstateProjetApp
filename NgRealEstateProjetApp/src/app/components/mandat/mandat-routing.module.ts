import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddMandatComponent } from "./add-mandat/add-mandat.component";
import { MandatDetailsComponent } from "./mandat-details/mandat-details.component";
import { MandatComponent } from "./mandat.component";

const routes: Routes = [
  {
    path: "",
    component: MandatComponent,
  },
  {
    path: ":id",
    component: MandatComponent,
  },
  {
    path: ":id/details",
    component: MandatDetailsComponent,
  },
  {
    path: ":id/addmandat",
    component: AddMandatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MandatRoutingModule {}
