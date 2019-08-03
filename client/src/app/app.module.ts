import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {SHARED_SERVICES} from './shared/services';
import {RouterModule} from '@angular/router';
import {routes} from './app.routing';
import {SearchFormModule} from './shared/components/search-form/search-form.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {API_BASE_URL, WS_URL} from './app.tokens';
import {environment} from '../environments/environment';

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
    RouterModule.forRoot(routes),
    MatSidenavModule,
    SearchFormModule,
    BrowserAnimationsModule
  ],
  providers: [
    ...SHARED_SERVICES,
    {provide: API_BASE_URL , useValue: environment.apiBaseUrl},
    {provide: WS_URL , useValue: environment.wsUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
