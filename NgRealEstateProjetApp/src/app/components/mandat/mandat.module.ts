import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MandatRoutingModule } from './mandat-routing.module';
import { MandatComponent } from './mandat.component';
import { MandatDetailsComponent } from './mandat-details/mandat-details.component';
import { AddMandatComponent } from './add-mandat/add-mandat.component';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '@shared/shared.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [MandatComponent, MandatDetailsComponent, AddMandatComponent],
  imports: [
    CommonModule,
    MandatRoutingModule,
    DragDropModule,
    NgxSliderModule,
    MaterialModule,
    SharedModule,
  ]
})
export class MandatModule { }
