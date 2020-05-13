import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorComponent } from './sponsor.component';
import { SponsorAgentFormComponent } from './sponsor-agent-form/sponsor-agent-form.component';



const routes: Routes = [
  {
      path: '', 
      component: SponsorComponent,
      children:[
        {path:'form',component:SponsorAgentFormComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorRoutingModule {}
