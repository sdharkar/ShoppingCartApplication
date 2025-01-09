import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  public customerForm!: FormGroup;
  public customer = new Customer();

  title: string = 'Add New Customer';
  button: string = 'Add Customer';

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: Customer
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      image: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      address: ['', Validators.required],
      verified: ['', Validators.required],
      username: localStorage.getItem('username'),
    });

    console.log(`Customer Data is: `);
    console.log(this.editData);

    if (this.editData != null) {
      this.title = 'Update Customer Details';
      this.button = 'Update Details';
      this.customerForm.controls['id'].setValue(this.editData.id);
      this.customerForm.controls['name'].setValue(this.editData.name);
      this.customerForm.controls['image'].setValue(this.editData.image);
      this.customerForm.controls['emailId'].setValue(this.editData.emailId);
      this.customerForm.controls['mobile'].setValue(this.editData.mobile);
      if (this.editData.verified === true) {
        this.customerForm.controls['verified'].setValue('yes');
      } else {
        this.customerForm.controls['verified'].setValue('no');
      }
      this.customerForm.controls['address'].setValue(this.editData.address);
    }
  }

  onSubmit() {
    if (this.editData == null) {
      if (this.customerForm.valid) {
        this.customer.name = this.customerForm.get('name')?.value;
        this.customer.emailId = this.customerForm.get('emailId')?.value;
        this.customer.image = this.customerForm.get('image')?.value;
        this.customer.mobile = this.customerForm.get('mobile')?.value;
        this.customer.address = this.customerForm.get('address')?.value;

        console.log(this.customerForm.get('verified')?.value);

        if (this.customerForm.get('verified')?.value === 'yes') {
          this.customer.verified = true;
        } else {
          this.customer.verified = false;
        }
        this.customer.username = localStorage.getItem('username');

        console.log(`Customer Details are: `);
        console.log(this.customer);

        this.customerService.setCustomer(this.customer).subscribe((data) => {
          console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Details Added Successfully',
            showConfirmButton: false,
            timer: 3500,
          });
          location.reload();
          this.customerForm.reset();
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
    } else {
      this.customer.id = this.customerForm.get('id')?.value;
      this.customer.name = this.customerForm.get('name')?.value;
      this.customer.emailId = this.customerForm.get('emailId')?.value;
      this.customer.image = this.customerForm.get('image')?.value;
      this.customer.mobile = this.customerForm.get('mobile')?.value;
      this.customer.address = this.customerForm.get('address')?.value;

      console.log(this.customerForm.get('verified')?.value);

      if (this.customerForm.get('verified')?.value === 'yes') {
        this.customer.verified = true;
      } else {
        this.customer.verified = false;
      }
      this.customer.username = localStorage.getItem('username');
      this.updateCustomer();
    }
  }

  updateCustomer() {
    if (this.customerForm.valid) {
      console.log('Customer Details To Be Updated Are: ');
      console.log(this.customer);

      this.customerService.updateCustomer(this.customer).subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Details Updated Successfully',
            showConfirmButton: false,
            timer: 1000,
          });

          location.reload();
          this.customerForm.reset();
          this.dialog.closeAll();
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Details Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          location.reload();
          this.dialog.closeAll();
          this.customerForm.reset();
        }
      );
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

  async delay(ms: number) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms)).then(
      () => console.log('fired')
    );
  }
}
