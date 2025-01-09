import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public username: any;
  public user!: User[];
  project!: User[];
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.username = this.loginService.getUsername();

    this.loginService.getUserByUsername(this.username).subscribe((data) => {
      this.user = data;
      console.log(`User is:`);

      this.project = Object.values(this.user);
      console.log(this.project);
    });
  }
}
