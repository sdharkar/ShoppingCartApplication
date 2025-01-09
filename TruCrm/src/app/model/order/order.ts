import { Customer } from '../customer/customer';
import { Product } from '../product/product';

export class Order {
  orderId: any;
  customer!: Customer;
  product!: Product[];
  orderDate!: Date;
  totalPrice!: number;
  orderStatus!: any;
  username!: any;
}
