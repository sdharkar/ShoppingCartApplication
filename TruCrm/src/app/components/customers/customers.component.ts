import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  public customerDetails: Customer[] = [];

  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((data: Customer[]) => {
      this.customerDetails = data;
      console.log(`Customer Details Are: `);
      console.log(this.customerDetails);
    });
  }

  openDialog(): void {
    this.dialog.open(AddCustomerComponent, {
      width: '30%',
    });
  }

  updateCustomer(customer: Customer): void {
    this.dialog.open(AddCustomerComponent, {
      width: '30%',
      data: customer,
    });
  }

  deleteCustomer(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe((data) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          location.reload();
        });
      }
    });
  }
}
