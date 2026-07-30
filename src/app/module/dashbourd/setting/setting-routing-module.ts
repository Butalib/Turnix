import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sitting } from './sitting/sitting';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sitting',
    pathMatch: 'full'
  },
  {
    path: 'sitting',
    component: Sitting
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
