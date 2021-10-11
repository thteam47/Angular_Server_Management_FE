import { SiblingService } from 'src/app/services/sibling.service';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  loading = false;
  constructor(private fb: FormBuilder, private sibling: SiblingService, private _snackBar: MatSnackBar, private router: Router, private toastr: ToastrService, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  login() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    const user = <User>{
      username: this.form.value.username,
      password: this.form.value.password
    }
    this.userService.loginAdmin(user).subscribe((res: any) => {
      if (res.ok == true) {
        localStorage.setItem('token', res.accessToken)
        localStorage.setItem('role', res.role)
        this.fakeLoading();
        this.toastr.success('Login Succesfull');
      }
    },
      (err: any) => {
        this.error();
        this.form.reset();
      }
    )
  }

  error() {
    this._snackBar.open('Username or password incorrect', 'Again', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 2000);
  }

}
