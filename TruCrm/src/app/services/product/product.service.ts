import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: Product[] = [];
  username = localStorage.getItem('username');
  baseUrl = `http://localhost:8002/api/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/username?username=${this.username}`
    );
  }

  setProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, product, {
      responseType: 'text',
    });
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/update?productName=${product.productName}`,
      product,
      { responseType: 'text' }
    );
  }

  deleteProduct(productName: String): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/delete?productName=${productName}`,
      { responseType: 'text' }
    );
  }

  getProductByProductName(productName: String): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseUrl}/product-name?productName=${productName}`
    );
  }

  setProductDetails(productDetails: Product[]) {
    this.product = productDetails;
  }

  getProductDetails() {
    return this.product;
  }

  get nativeWindow(): any {
    return _window();
  }
}
