import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MandatAdminRoutingModule } from './mandat-admin-routing.module';
import { MandatAdminComponent } from './mandat-admin.component';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MandatDetailsComponent } from './mandat-details/mandat-details.component';


@NgModule({
  declarations: [MandatAdminComponent, MandatDetailsComponent],
  imports: [
    CommonModule,
    MandatAdminRoutingModule,
    MaterialModule,
    DragDropModule,
    SharedModule,
  ]
})
export class MandatAdminModule { }
