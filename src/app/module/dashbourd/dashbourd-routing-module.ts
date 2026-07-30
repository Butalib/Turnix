import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./workspace/workspace-module').then(m => m.WorkspaceModule)
  },
  {
    path: '',
    loadChildren: () => import('./employee/employee-module').then(m => m.EmployeeModule)
  },
  {
    path: '',
    loadChildren: () => import('./report/report-module').then(m => m.ReportModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbbourdRoutingModule { }
