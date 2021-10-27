import { NotFoundComponent } from "./../components/not-found/not-found.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { RoutesRoutingModule } from "./routes-routing.module";
import { MaterialModule } from "app/material.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "@core/token.interceptor";

const COMPONENTS = [NotFoundComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule, MaterialModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class RoutesModule {}
