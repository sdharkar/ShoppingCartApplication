import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public username = localStorage.getItem('username');

  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog() {
    this.dialog.open(SignupComponent, {
      width: '65%',
    });
  }

  openSignIn() {
    this.dialog.open(SigninComponent, {
      width: '65%',
    });
  }

  ngOnInit(): void {
    if (this.username != null) {
      this.router.navigate(['/dashboard/home']);
    }
  }
}
