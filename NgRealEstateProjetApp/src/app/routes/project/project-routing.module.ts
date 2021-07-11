import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';




const routes: Routes = [
  {
      path: '', 
      component:ProjectComponent,
      children:[
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'projectform'
        },
        {path:'projectform',component:ProjectFormComponent},
        {path:'projectlist',component:ProjectListComponent}
      ]
  },
  {path:':id/details',component:ProjectDetailsComponent},
  {path:':id/update',component:UpdateProjectComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
