import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService} from '../shared/services';
import {filter, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'nga-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>;
  suggestedProduct$: Observable<Product[]>;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {

    this.product$ = this.route.paramMap
      .pipe(
        map(param => parseInt(param.get('productId') || '', 10)),
        filter(productId => !!productId),
        switchMap(productId => this.productService.getById(productId))
      );

    this.suggestedProduct$ = this.route.paramMap
      .pipe(
        map(param => parseInt(param.get('productId') || '', 10)),
        filter(productId => !!productId),
        switchMap(productId => this.productService.getAllExcluding(productId))
      );
  }

  ngOnInit() {

  }
}
