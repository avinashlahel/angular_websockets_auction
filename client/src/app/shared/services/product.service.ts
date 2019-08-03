import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface ProductSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class ProductService {
  abstract getAll(): Observable<Product[]>;
  abstract getById(productId: number): Observable<Product>;
  abstract getByCategory(category: string): Observable<Product[]>;
  abstract getAllCategories(): Observable<string[]>;
  abstract search(params: ProductSearchParams): Observable<Product[]>;
}

@Injectable()
export class HttpProductService implements ProductService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`);
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/categories/${category}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/categories`);
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    const query = params.params;
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`, { params: query });
  }
}
