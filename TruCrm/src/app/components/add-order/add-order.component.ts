import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer/customer';
import { Order } from 'src/app/model/order/order';
import { orderStatus } from 'src/app/model/order/orderStatus';
import { Product } from 'src/app/model/product/product';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  product = new Product();
  dataArray: Product[] = [];

  customer!: FormGroup;

  username = localStorage.getItem('username');
  fare: number = 0;
  id!: number;
  productDetails: Product[] = [];
  customerDetails!: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = new Product();
    this.dataArray.push(this.product);
    this.customer = this.formBuilder.group({
      id: ['', Validators.required],
    });

    this.productService.getAllProducts().subscribe((data) => {
      this.productDetails = data;
    });
  }

  addForm() {
    this.product = new Product();
    this.dataArray.push(this.product);
  }
  removeForm(index: number) {
    this.dataArray.splice(index, 1);
  }

  onSubmit() {
    this.id = this.customer.controls['id'].value;

    this.customerService.getCustomerById(this.id).subscribe((data) => {
      this.customerDetails = data;

      this.customerService.setCustomerDetails(this.customerDetails);
    });
  }

  productSubmit() {
    console.log(this.dataArray);

    this.productService.setProductDetails(this.dataArray);

    this.router.navigate(['../../dashboard/orderSummary']);
  }
}
