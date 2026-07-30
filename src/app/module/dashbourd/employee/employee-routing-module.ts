import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Employee } from './employee/employee';

const routes: Routes = [
  {path : '', redirectTo : 'employee', pathMatch : 'full'},
  {path : 'employee', component : Employee},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
