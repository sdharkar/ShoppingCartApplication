import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/model/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }

  openDialog(): void {
    this.dialog.open(AddProductComponent, {
      width: '45%',
    });
  }

  updateProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      width: '45%',
      data: product,
    });
  }

  deleteProduct(productName: String) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productName).subscribe((data) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          location.reload();
        });
      }
    });
  }
}
