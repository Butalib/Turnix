import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page-module').then(m => m.LandingPageModule)
  },
  {
    path : 'queue',
    loadChildren: () => import('./queue-tracking/queue-tracking-module').then(m => m.QueueTrackingModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
