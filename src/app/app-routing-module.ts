import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./module/public/public-module').then(m => m.PublicModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./module/auth/login/login-module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./module/dashbourd/dashbourd-module').then(m => m.DashbbourdModule),
  },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }