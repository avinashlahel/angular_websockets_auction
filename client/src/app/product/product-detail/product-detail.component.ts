import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../shared/services';
import {combineLatest, Observable, Subject} from 'rxjs';
import {API_BASE_URL} from '../../app.tokens';
import {BidMessage, BidService} from '../../shared/services/bid.service';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'nga-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit,OnChanges {

  @Input() product: Product;
  private readonly productChange$ = new Subject<Product>();
  latestBids$: Observable<number>;

  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string,
              private readonly bidService: BidService) { }

  ngOnChanges({product}: SimpleChanges): void {
    this.productChange$.next(product.currentValue)
  }

  ngOnInit() {
    this.latestBids$ =
      combineLatest(
        this.productChange$.pipe(startWith(this.product)),
        this.bidService.priceUpdates$.pipe(startWith<BidMessage|null>(null)),
        (product, bid) => bid && bid.productId === product.id ? bid.price : product.price
      )
  }

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }

}
