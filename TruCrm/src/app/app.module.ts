import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BodyComponent } from './components/body/body.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { SuccessComponent } from './components/success/success.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    HomeDashboardComponent,
    SideNavbarComponent,
    BodyComponent,
    MainDashboardComponent,
    CustomersComponent,
    ProductsComponent,
    OrdersComponent,
    ProfileComponent,
    AboutComponent,
    AddCustomerComponent,
    AddProductComponent,
    AddOrderComponent,
    OrderSummaryComponent,
    ViewOrderComponent,
    UpdateOrderComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatCardModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
