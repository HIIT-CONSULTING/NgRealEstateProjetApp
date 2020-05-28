import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorAdminComponent } from './sponsor-admin.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';




const routes: Routes = [
  {
      path: '', 
      component: SponsorAdminComponent
  },
  { 
      path:':id/details',
      component:CandidateDetailsComponent
  }
      
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorAdminRoutingModule {}
