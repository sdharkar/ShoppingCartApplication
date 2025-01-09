import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Customer } from 'src/app/model/customer/customer';
import { Order } from 'src/app/model/order/order';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  totalCustomers!: number;
  totalProducts!: number;
  totalOrders!: number;
  totalIncome: number = 0;
  customer: Customer[] = [];
  order: Order[] = [];
  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.totalCustomers = data.length;
      this.customer = data;
    });

    this.productService.getAllProducts().subscribe((data) => {
      this.totalProducts = data.length;
    });

    this.orderService.getOrderByUsername().subscribe((data) => {
      this.totalOrders = data.length;
      this.order = data;
      for (let o of data) {
        this.totalIncome += o.totalPrice;
      }
    });
  }

  customerNavigate() {
    this.router.navigate(['../../dashboard/customers']);
  }

  productNavigate() {
    this.router.navigate(['../../dashboard/products']);
  }

  orderNavigate() {
    this.router.navigate(['../../dashboard/orders']);
  }
}
