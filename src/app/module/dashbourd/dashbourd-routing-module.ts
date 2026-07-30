
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Layout } from './layout/layout'; 

const routes: Routes = [
  {
     path: '', 
    
    component: Layout, 
    
    canActivate: [AuthGuard], 
    children: [
      { 
        path: '', 
        redirectTo: 'Workspace', 
        pathMatch: 'full' 
      },
      {
        path: 'Workspace',
        loadChildren: () => import('./workspace/workspace-module').then(m => m.WorkspaceModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee-module').then(m => m.EmployeeModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report-module').then(m => m.ReportModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting-module').then(m => m.SettingModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile-module').then(m => m.ProfileModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbbourdRoutingModule { }