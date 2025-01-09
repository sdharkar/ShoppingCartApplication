import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  registration(registrationForm: FormGroup) {
    this.registrationForm = registrationForm;

    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.registerNewUser(this.registrationForm.value.username);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid Form Submission Attempt!',
        text: 'Please Fill All The Details Carefully!',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }

  registerNewUser(username: string) {
    return this.registerService
      .getUserByUsername(username)
      .subscribe((data) => {
        if (data == 'true') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Username Already Registered',
            text: 'Try Another Username',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          if (this.registrationForm.valid) {
            this.registerService
              .setUsers(this.registrationForm.value)
              .subscribe((data) => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Registeration Successful',
                  showConfirmButton: false,
                  timer: 2500,
                });
              });
          }
          this.dialog.closeAll();
          this.dialog.open(SigninComponent, {
            width: '65%',
          });
        }
        this.registrationForm.reset();
      });
  }
}
