import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer/customer';
import { Order } from 'src/app/model/order/order';
import { Product } from 'src/app/model/product/product';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent implements OnInit {
  orderDetails!: Order;
  customerDetails!: Customer;
  productDetails: Product[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: Order,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderDetails = this.editData;
    this.customerDetails = this.orderDetails.customer;
    this.productDetails = this.orderDetails.product;
  }
}
