import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SettingRoutingModule } from './setting-routing-module';
import { Sitting } from './sitting/sitting';


@NgModule({
  declarations: [
    Sitting
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule
  ]
})
export class SettingModule { }
