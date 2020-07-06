import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { SponsorRoutingModule} from './sponsor-routing.module';
import { MaterialModule } from '../../material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SponsorComponent } from './sponsor.component';
import { SponsorAgentFormComponent } from './sponsor-agent-form/sponsor-agent-form.component';
import { SponsorAgentListComponent } from './sponsor-agent-list/sponsor-agent-list.component';
import { UpdateCandidateComponent } from './sponsor-agent-list/update-candidate/update-candidate.component';
import { CandidateDetailsComponent } from './sponsor-agent-list/candidate-details/candidate-details.component';



const COMPONENTS = [SponsorComponent, SponsorAgentFormComponent, SponsorAgentListComponent,UpdateCandidateComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, SponsorRoutingModule, MaterialModule, SharedModule,DragDropModule,CommonModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, CandidateDetailsComponent],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SponsorModule { }
