import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  orderId: any;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderId = this.orderService.getOrderId();
    console.log(this.orderId);
  }

  goToDashboard() {
    this.router.navigate(['../../dashboard/home']);
  }
}
