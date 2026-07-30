import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueueTrackingComponent } from './landing-page/queue-tracking/queue-tracking';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {
    
    path: 'landing',
    loadChildren: () => import('./landing-page/landing-page-module').then(m => m.LandingPageModule)
  },
  {
    path : 'queue',
    component : QueueTrackingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
