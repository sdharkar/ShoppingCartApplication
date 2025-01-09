import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order/order';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { AddOrderComponent } from '../add-order/add-order.component';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { ViewOrderComponent } from '../view-order/view-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderDetails: Order[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrderByUsername().subscribe((data) => {
      this.orderDetails = data;
    });
  }

  openDialog(): void {
    this.router.navigate(['/dashboard/addOrder']);
  }

  updateOrder(order: Order): void {
    this.dialog.open(UpdateOrderComponent, {
      width: '45%',
      data: order,
    });
  }

  viewOrder(order: Order): void {
    this.dialog.open(ViewOrderComponent, {
      width: '90%',
      data: order,
      autoFocus: false,
    });
  }

  deleteOrder(orderId: number) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(orderId).subscribe((data) => {
          Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
          location.reload();
        });
      }
    });
  }
}
