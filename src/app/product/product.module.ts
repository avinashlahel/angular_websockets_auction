import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSuggestionComponent } from './product-suggestion/product-suggestion.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatGridListModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductComponent
      }
    ]),
    MatGridListModule
  ],
  declarations: [ProductComponent, ProductDetailComponent, ProductSuggestionComponent]
})
export class ProductModule { }
