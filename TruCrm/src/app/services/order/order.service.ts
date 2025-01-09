import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = `http://localhost:8002/api/orders`;
  username = localStorage.getItem('username');

  orderId!: any;

  constructor(private http: HttpClient) {}

  setOrder(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, order, { responseType: 'text' });
  }

  getOrderByUsername(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.baseUrl}/username?username=${this.username}`
    );
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, order, {
      responseType: 'text',
    });
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete?orderId=${orderId}`, {
      responseType: 'text',
    });
  }

  setOrderId(orderId: any) {
    localStorage.setItem('orderId', orderId);
  }

  getOrderId() {
    return localStorage.getItem('orderId');
  }
}
