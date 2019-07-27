import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '' , component: HomeComponent}
    ]),
    FlexLayoutModule,
    MatGridListModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
