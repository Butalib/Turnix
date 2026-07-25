import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Workspace } from './workspace/workspace';

const routes: Routes = [
  {
    path: '',
    component: Workspace
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
