import {Inject, Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/webSocket';
import {WS_URL} from '../../app.tokens';
import {Observable} from 'rxjs';

export interface BidMessage {
  productId: number;
  price: number;
}

@Injectable()
export class BidService {

  private _wsSubject: WebSocketSubject<any>;

  private get wsSubject(): WebSocketSubject<any> {
    const closed = !this._wsSubject || this._wsSubject.closed;
    if (closed) {
      this._wsSubject = new WebSocketSubject(this.wsUrl);
    }
    return this._wsSubject;
  }

  constructor(@Inject(WS_URL) private readonly wsUrl: string) {
  }

  get priceUpdates$(): Observable<BidMessage> {
    return this.wsSubject.asObservable();
  }

  placeBid(productId: number, price: number): void {
    this.wsSubject.next({productId, price});
  }

}
