import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
{path : '', redirectTo : 'workspace', pathMatch : 'full'},
{
  path: 'workspace',
  canActivate: [AuthGuard],
  loadChildren: () => import('./workspace/workspace-module').then(m => m.WorkspaceModule)
},
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () => import('./employee/employee-module').then(m => m.EmployeeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbbourdRoutingModule { }
