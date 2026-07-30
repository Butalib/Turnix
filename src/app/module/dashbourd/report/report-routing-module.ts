import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './report/report';

const routes: Routes = [
  {path : '', redirectTo : 'report', pathMatch : 'full'},
  {path : 'report', component : ReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
