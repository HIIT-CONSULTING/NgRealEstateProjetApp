import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorComponent } from './sponsor.component';
import { SponsorAgentFormComponent } from './sponsor-agent-form/sponsor-agent-form.component';
import { SponsorAgentListComponent } from './sponsor-agent-list/sponsor-agent-list.component';
import { UpdateCandidateComponent } from './sponsor-agent-list/update-candidate/update-candidate.component';
import { CandidateDetailsComponent } from './sponsor-agent-list/candidate-details/candidate-details.component';



const routes: Routes = [
  {
      path: '',
      component: SponsorComponent,
      children:[
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'form'
        },
        {path:'form',component:SponsorAgentFormComponent},
        {path:'list',component:SponsorAgentListComponent}
      ]
  },

  {
    path:':id/details',
    component:CandidateDetailsComponent,
} ,
{
path:':id/update',
component:UpdateCandidateComponent
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorRoutingModule {}
