import {Component, OnInit} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Product, ProductService} from '../shared/services';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'nga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly columns$: Observable<number>;
  readonly products$: Observable<Product[]>;

  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5],
  ]);


  constructor(private media: ObservableMedia,
              private productService: ProductService) {
    this.products$ = productService.getAll();
    this.columns$ = media.asObservable()
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3)
      )

  }

  ngOnInit() {
  }

}
