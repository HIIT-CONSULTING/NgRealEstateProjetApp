import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindAgentFormComponent } from './find-agent-form/find-agent-form.component';
import { FindAgentDetailComponent } from './find-agent-detail/find-agent-detail.component';

const routes: Routes = [
  {
      path: '', 
      component: FindAgentFormComponent,
  },{
        path: ':id',
        component: FindAgentDetailComponent 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindAgentRoutingModule {}
