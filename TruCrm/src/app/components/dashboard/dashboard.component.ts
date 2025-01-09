import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username!: string | null;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  logoutUser() {
    this.loginService.logout();
    window.location.href = '/';
  }
}
