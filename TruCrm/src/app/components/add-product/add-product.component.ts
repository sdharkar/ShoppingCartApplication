import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public productForm!: FormGroup;
  public product = new Product();
  title = 'Add Product Details';
  button = 'Add Product';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: Product
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.maxLength(20)]],
      image: ['', Validators.required],
      category: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      price: ['', [Validators.required]],
      inKG: ['', Validators.required],
      username: localStorage.getItem('username'),
    });

    if (this.editData) {
      this.title = 'Update Product Details';
      this.button = 'Update Product';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );

      this.productForm.controls['image'].setValue(this.editData.image);

      this.productForm.controls['category'].setValue(
        this.editData.productCategory
      );

      this.productForm.controls['quantity'].setValue(
        this.editData.productQuantity
      );

      this.productForm.controls['price'].setValue(this.editData.productPrice);

      if (this.editData.inKG) {
        this.productForm.controls['inKG'].setValue('yes');
      } else {
        this.productForm.controls['inKG'].setValue('no');
      }
    }
  }

  onSubmit() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.product.productName =
          this.productForm.controls['productName'].value;
        this.product.image = this.productForm.get('image')?.value;
        this.product.productCategory = this.productForm.get('category')?.value;
        this.product.productQuantity = this.productForm.get('quantity')?.value;
        this.product.productPrice = this.productForm.get('price')?.value;
        if (this.productForm.get('inKG')?.value === 'yes') {
          this.product.inKG = true;
        } else {
          this.product.inKG = false;
        }
        this.product.username = localStorage.getItem('username');

        console.log(this.product);

        this.productService.setProduct(this.product).subscribe((data) => {
          console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product Details Added Successfully',
            showConfirmButton: false,
            timer: 3500,
          });
          location.reload();
          this.productForm.reset();
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
      this.product.productName = this.productForm.controls['productName'].value;
      this.product.image = this.productForm.get('image')?.value;
      this.product.productCategory = this.productForm.get('category')?.value;
      this.product.productQuantity = this.productForm.get('quantity')?.value;
      this.product.productPrice = this.productForm.get('price')?.value;
      if (this.productForm.get('inKG')?.value === 'yes') {
        this.product.inKG = true;
      } else {
        this.product.inKG = false;
      }
      this.product.username = localStorage.getItem('username');
      this.updateProduct();
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      console.log(`Updated Details Are: `);
      console.log(this.product);

      this.productService.updateProduct(this.product).subscribe((data) => {
        console.log(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product Details Updated Successfully',
          showConfirmButton: false,
          timer: 1000,
        });

        location.reload();
        this.productForm.reset();
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
