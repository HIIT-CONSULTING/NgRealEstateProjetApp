import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandatAdminComponent } from './mandat-admin.component';
import { MandatDetailsComponent } from './mandat-details/mandat-details.component';


const routes: Routes = [
  {
    path: '', 
    component: MandatAdminComponent
    
  },
  { 
      path:':id/details',
      component:MandatDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MandatAdminRoutingModule { }
