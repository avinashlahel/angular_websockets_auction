import {Route} from '@angular/router';
import {SearchResultsComponent} from './home/search-results/search-results.component';
import {CategoriesComponent} from './home/categories/categories.component';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'products/:productId',
    loadChildren: './product/product.module#ProductModule'
  }
];



