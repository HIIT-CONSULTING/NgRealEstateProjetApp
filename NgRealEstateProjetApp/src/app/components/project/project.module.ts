import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { MaterialModule } from "../../material.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ProjectComponent } from "./project.component";
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectRoutingModule } from "./project-routing.module";
import { UpdateProjectComponent } from "./update-project/update-project.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";

const COMPONENTS = [
  ProjectComponent,
  ProjectFormComponent,
  ProjectListComponent,
];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    ProjectRoutingModule,
    MaterialModule,
    SharedModule,
    DragDropModule,
    CommonModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    UpdateProjectComponent,
    ProjectDetailsComponent,
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class ProjectModule {}
