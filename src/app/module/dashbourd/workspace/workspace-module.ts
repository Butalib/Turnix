import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkspaceRoutingModule } from './workspace-routing-module';
import { Workspace } from './workspace/workspace';


@NgModule({
  declarations: [
    Workspace
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    FormsModule
    
  ]
})
export class WorkspaceModule { }
