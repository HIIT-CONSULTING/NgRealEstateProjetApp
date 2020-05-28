import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ContactComponent } from './contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';




const COMPONENTS = [ContactComponent,ContactFormComponent,ContactListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ContactRoutingModule, MaterialModule, SharedModule,DragDropModule,CommonModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, UpdateContactComponent,  ContactDetailsComponent],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ContactModule { }
