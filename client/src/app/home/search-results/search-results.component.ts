import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService} from '../../shared/services';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'nga-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  readonly products$: Observable<Product[]>;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
    this.products$ =
      this.route.queryParamMap
        .pipe(
          switchMap(queryParams => this.productService.search(queryParams))
        )
  }

  ngOnInit() {

  }

}
