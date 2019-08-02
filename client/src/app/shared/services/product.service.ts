import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';

/**
 * @author Avinash
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface ProductSearchParams {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  /**
   * Mainly used in suggestions; Filter out the product
   * already selected by the user
   * @param productId
   */
  getAllExcluding(productId: number): Observable<Product[]>{
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(products => products.filter(product => product.id !== productId))
      );
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => products.filter(p => p.categories.includes(category)))
    );
  }

  /**
   * To get the distinct categories available in the app to show
   * in @CategoriesComponent
   */
  getDistinctCategories(): Observable<string[]>{

    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(this.reduceCategories),
        map(categories => Array.from(new Set(categories))),
        // tap(value => console.log(`After creating categories array ${value}`))
      );

  }

  private reduceCategories(product: Product[]) : string[]{
    return product.reduce((newArr , prod) => newArr.concat(prod.categories),new Array());
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json');
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(products => <Product>products.find(p => p.id === productId))
      );
  }

  search(params): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => this.filterProducts(products, params.params)),
      tap(p => console.log(`filtered products ${p}`))
    );
  }

  // Keep only those product that meet the criteria from search params
  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products
      .filter(p => params.title ? p.title.toLowerCase().includes((<string>params.title).toLowerCase()) : products)
      .filter(p => params.minPrice ? p.price >= params.minPrice : products)
      .filter(p => params.maxPrice ? p.price <= params.maxPrice : products);
  }
}
