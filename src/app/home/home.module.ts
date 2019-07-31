import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule, MatTabsModule} from '@angular/material';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      // {path: '', component: HomeComponent}
      {
        path: '', redirectTo: 'categories', pathMatch: 'full'
      },
      {
        path: 'search-results', component: SearchResultsComponent
      },
      {
        path: 'categories',
        children: [
          {path: '', redirectTo: 'all', pathMatch: 'full'},
          {path: ':category', component: CategoriesComponent}
        ]
      }

    ]),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule
  ],
  declarations: [HomeComponent, SearchResultsComponent, ProductGridComponent, CategoriesComponent]
})
export class HomeModule { }
