import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SponsorAdminComponent } from './sponsor-admin.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { SponsorAdminRoutingModule } from './sponsor-admin-routing.module';



const COMPONENTS = [SponsorAdminComponent,CandidateDetailsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, SponsorAdminRoutingModule, MaterialModule, SharedModule,DragDropModule,CommonModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SponsorAdminModule { }
