import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private router: Router
  ) {}

  openDialog() {
    this.dialog.closeAll();
    this.dialog.open(ForgotPasswordComponent, {
      width: '65%',
    });
  }

  credentials = {
    username: '',
    password: '',
  };

  userDetails!: any;

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form is submitted!');

    if (
      this.credentials.username != '' &&
      this.credentials.password != '' &&
      this.credentials.username != null &&
      this.credentials.password != null
    ) {
      //generate token for user credentials
      this.loginService.generateToken(this.credentials).subscribe(
        (data: any) => {
          this.userDetails = data;
          this.loginService.setUserDetails(data.user);
          this.loginService.setUsername(this.credentials.username);

          this.loginService.setRoles(data.user.roles);

          console.log(typeof data.user.roles);

          const role = data.user.roles[0].roleName;

          console.log(`Role is: ${role}`);
          this.loginService.setRole(role);

          console.log(data.jwtToken);
          this.loginService.loginUser(data.jwtToken);

          console.log(data.jwtToken);
          this.loginService.loginUser(data.jwtToken);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged In Successful',
            text: `You Logged In As USER!`,
            showConfirmButton: false,
            timer: 3500,
          });
          this.router.navigate(['/dashboard/home']);
          location.reload();
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Invalid Credentials',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Submission',
        text: 'All The Details Are Necessary\nPlease Fill Them Carefully!',
      });
    }
  }
}
