import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilDetailsComponent } from './profil-details/profil-details.component';


const COMPONENTS = [ProfilDetailsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ProfilRoutingModule, MaterialModule, SharedModule,DragDropModule,CommonModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ProfilDetailsComponent],
  entryComponents: COMPONENTS_DYNAMIC
})

export class ProfilModule { }
