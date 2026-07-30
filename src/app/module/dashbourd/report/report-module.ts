import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing-module';
import { ReportsComponent } from './report/report';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReportRoutingModule, ReportsComponent
  ]
})
export class ReportModule { }
