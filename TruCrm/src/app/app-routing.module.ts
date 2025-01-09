import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SuccessComponent } from './components/success/success.component';
import { GuardGuard } from './security/guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'home',
        component: MainDashboardComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'addOrder',
        component: AddOrderComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'orderSummary',
        component: OrderSummaryComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: 'success',
        component: SuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
