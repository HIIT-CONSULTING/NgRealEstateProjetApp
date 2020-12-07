import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '@core/guards/auth.guard';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LoginComponent } from './login.component';
import { LoginService } from '@core/login.service';
import { TokenInterceptor } from '@core/token.interceptor';
import { LoginRoutingModule } from './login-routing.module';
import { LoginGuard } from '@core/guards/login.guard';

const COMPONENTS = [LoginComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, MaterialModule, SharedModule,DragDropModule,CommonModule ,ReactiveFormsModule,HttpClientModule,LoginRoutingModule ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    AuthGuard,
   // LoginGuard,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class LoginModule {}
