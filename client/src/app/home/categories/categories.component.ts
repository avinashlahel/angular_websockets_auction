import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product, ProductService} from '../../shared/services';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'nga-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  readonly categoriesNames$: Observable<string[]>;
  readonly products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {

    this.categoriesNames$ =
      this.productService.getDistinctCategories()
      .pipe(
        map(categories => ['all',...categories])
      );

    this.products$ = this.route.paramMap
      .pipe(
        switchMap(value => this.getCategory(<string>value.get('category')))
      );
  }

  private getCategory(category: string): Observable<Product[]> {
    return category.toLowerCase() === 'all'
      ? this.productService.getAll()
      : this.productService.getByCategory(category.toLowerCase());
  }

  ngOnInit() {
  }

}
