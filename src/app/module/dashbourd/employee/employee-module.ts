import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing-module';
import { Employee } from './employee/employee';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,Employee
  ]
})
export class EmployeeModule { }
