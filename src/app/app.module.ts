import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './shared/services';
import {RouterModule} from '@angular/router';
import {routes} from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
