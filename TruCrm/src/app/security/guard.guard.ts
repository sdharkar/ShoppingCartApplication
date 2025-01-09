import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.loginService.isLoggedIn()) {
      // this.router.navigate(['/dashboard/home']);
      return true;
    }
    Swal.fire({
      icon: 'error',
      title: 'Forbidden',
      text: `You Don't Have User Rights`,
    });
    this.router.navigate(['']);
    return false;
  }
}
