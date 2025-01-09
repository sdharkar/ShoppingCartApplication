import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer/customer';
import { Order } from 'src/app/model/order/order';
import { orderStatus } from 'src/app/model/order/orderStatus';
import { Product } from 'src/app/model/product/product';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  productDetails: Product[] = [];
  customerDetails!: Customer;
  totalFare: number = 0;
  orderDetails = new Order();
  options = {
    key: 'rzp_test_7PbkU7vlh4agXK',
    amount: 50000,
    currency: 'INR',
    name: 'TurCrm',
    description: 'Payment Integration To Place Your Order',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response: any) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Order Has Been Placed Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = '../../dashboard/success';
    },
    prefill: {
      name: 'Shrirang Dharkar',
      email: 'shri@mail.com',
      contact: '9876543210',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerDetails = this.customerService.getCustomerDetails();

    console.log(`Product Details Are: `);
    this.productDetails = this.productService.getProductDetails();

    this.productService.getAllProducts().subscribe((data) => {
      for (let i of data) {
        for (let j of this.productDetails) {
          if (i.productName == j.productName) {
            j.productPrice = i.productPrice;
            j.productCategory = i.productCategory;
            j.inKG = i.inKG;
            j.image = i.image;
            j.username = i.username;
          }
        }
      }

      console.log(`Product Details After Adding Price: `);
      console.log(this.productDetails);

      for (let i of this.productDetails) {
        this.totalFare = this.totalFare + i.productPrice * i.productQuantity;
      }
    });
  }

  submitOrderDetails() {
    this.orderDetails.customer = this.customerDetails;
    this.orderDetails.product = this.productDetails;
    this.orderDetails.orderStatus = orderStatus[0];
    this.orderDetails.totalPrice = this.totalFare;
    this.orderDetails.username = localStorage.getItem('username');

    console.log(`Order Details Are: `);
    console.log(this.orderDetails);

    this.orderService.setOrder(this.orderDetails).subscribe((data) => {
      console.log(data);
      this.orderService.setOrderId(data);
    });
  }

  onPay() {
    this.submitOrderDetails();

    this.options.amount = this.totalFare * 100;
    const rzp1 = new this.productService.nativeWindow.Razorpay(this.options);

    rzp1.open();

    rzp1.on('payment.failed', function (response: any) {
      alert('Payment Failed Due to unknown reasons');
    });
  }
}
