import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/model/order/order';
import { orderStatus } from 'src/app/model/order/orderStatus';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css'],
})
export class UpdateOrderComponent implements OnInit {
  orderStatus = orderStatus;
  orderForm!: FormGroup;
  orderDetails!: Order;

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public editData: Order,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      orderStatus: ['', Validators.required],
    });

    this.orderDetails = this.editData;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.orderDetails.orderStatus = this.orderForm.get('orderStatus')?.value;

      this.orderService.updateOrder(this.orderDetails).subscribe((data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Order Details Updated Successfully',
          showConfirmButton: false,
          timer: 3500,
        });
        location.reload();
        this.orderForm.reset();
        this.dialog.closeAll();
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid Form Submission',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
}
