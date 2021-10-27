import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

const routes: Routes = [
  {
      path: '', 
      component:ContactComponent,
      children:[
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'contactform'
        },
        {path:'contactform',component:ContactFormComponent},
        {path:'contactlist',children:[{path:'',component:ContactListComponent}]}
      ]
       
      
  },
  {path:':id/update',component:UpdateContactComponent},
  {path:':id/details',component:ContactDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
