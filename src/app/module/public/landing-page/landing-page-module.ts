import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingPageRoutingModule } from './landing-page-routing-module';
import { LandingPage } from './landing-page/landing-page';
  

@NgModule({
  declarations: [
    LandingPage
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule
  ]
})
export class LandingPageModule { }
