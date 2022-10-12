import { SiblingService } from 'src/app/services/sibling.service';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AuthenInfo } from 'src/app/interface/authenInfo';

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
    const authenInfo = <AuthenInfo>{
      type: "UsernamePassword",
      username: this.form.value.username,
      password: this.form.value.password
    }
    this.userService.loginAdmin(authenInfo).subscribe((res: any) => {
      console.log("res", res);
      if (res.errorCode === 0) {
        this.userService.prepareLogin(res.token).subscribe((res: any) => {
          console.log("res", res);
          localStorage.setItem('token', res.token)
          if (res.typeMfa !== "") {
            this.router.navigate(['prepare-login'], {
              state: {
                message: res.message,
                requestId: res.requestId,
              }
            });
            localStorage.setItem('message', res.message)
            localStorage.setItem('typeMfa', res.typeMfa)
            localStorage.setItem('requestId', res.requestId)
            localStorage.setItem('token', res.token)
            
          } else {
            this.router.navigate(['dashboard']);
          }
        },
          (err: any) => {
            this.error(err);
          }
        )
      } else {
        this.error(res.message);
        // this.form.reset();
      }
    },
      (err: any) => {
        this.error(err);
        this.form.reset();
      }
    )
  }

  error(message: string) {
    this._snackBar.open(message, 'Again', {
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
