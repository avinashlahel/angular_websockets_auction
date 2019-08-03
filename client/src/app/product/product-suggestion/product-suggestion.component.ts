import {Component, Inject, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../shared/services';
import {ObservableMedia} from '@angular/flex-layout';
import {map, startWith} from 'rxjs/operators';
import {API_BASE_URL} from '../../app.tokens';

@Component({
  selector: 'nga-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  styleUrls: ['./product-suggestion.component.scss']
})
export class ProductSuggestionComponent implements OnInit {

  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 2],
    ['sm', 3],
    ['md', 5],
    ['lg', 2],
    ['xl', 3],
  ]);

  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string,
              private media: ObservableMedia) {
    this.columns$ = this.media.asObservable()
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3) // bug workaround
      );
  }

  ngOnInit(): void {
  }
s
  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
