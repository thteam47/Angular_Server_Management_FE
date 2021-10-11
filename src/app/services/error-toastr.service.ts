import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorToastrService {

  constructor(private toastr: ToastrService, private router: Router) { }
  errToastr(err: any) {
    let errStr = err.error.error
    let login = true;
    if (errStr == "token incorrect" || errStr == "no authorization") {
      login = false;
      this.toastr.warning("Please log in");
    } else if (errStr == "token invalid") {
      login = false;
      this.toastr.warning("Login session has expired. Please log in again.");
    }
    if (errStr == "deny access") {
      this.toastr.warning("You do not have access to this site..");
      this.router.navigate(['/dashboard']);
    }
    if (login == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    this.toastr.error(err.error.error);
  }
}
