import {ProductService, Product, HttpProductService} from './product.service';
import {BidService} from './bid.service';
import {Provider} from '@angular/core';

export {ProductService, Product};

export const SHARED_SERVICES: Provider[] = [
  {provide: BidService, useClass: BidService},
  {provide: ProductService, useClass: HttpProductService}
]
