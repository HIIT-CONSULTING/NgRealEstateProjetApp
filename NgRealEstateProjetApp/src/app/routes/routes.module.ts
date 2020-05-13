import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';
import { MaterialModule } from 'app/material.module';
import { LoginComponent } from './login/login.component';


const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule,MaterialModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, LoginComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}
