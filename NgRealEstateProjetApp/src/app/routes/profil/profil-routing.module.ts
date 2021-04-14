import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilDetailsComponent } from './profil-details/profil-details.component';


const routes: Routes = [
  {
    path: '', 
    component:ProfilDetailsComponent  
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
