import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customer = new Customer();
  username = localStorage.getItem('username');
  id!: number;

  baseUrl = `http://localhost:8002/api/customers`;

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      `${this.baseUrl}/username?username=${this.username}`
    );
  }

  setCustomer(customer: Customer): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, customer, {
      responseType: 'text',
    });
  }

  updateCustomer(customer: Customer): Observable<any> {
    this.id = customer.id;

    return this.http.put(`${this.baseUrl}/update`, customer, {
      responseType: 'text',
    });
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text',
    });
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  setCustomerDetails(customerDetails: Customer) {
    this.customer = customerDetails;
  }

  getCustomerDetails() {
    return this.customer;
  }
}
