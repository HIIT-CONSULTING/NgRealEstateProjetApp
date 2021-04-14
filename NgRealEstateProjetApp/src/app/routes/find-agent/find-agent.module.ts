import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FindAgentFormComponent } from './find-agent-form/find-agent-form.component';
import { FindAgentDetailComponent } from './find-agent-detail/find-agent-detail.component';
import { FindAgentRoutingModule } from './find-agent-routing.module';
import { MaterialModule } from '../../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FindAgentService } from '@shared/services/find-agent.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@core/token.interceptor';
import { AuthGuard } from '@core/guards/auth.guard';

const COMPONENTS = [FindAgentFormComponent, FindAgentDetailComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, FindAgentRoutingModule, MaterialModule, SharedModule,DragDropModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,

})
export class FindAgentModule {}
