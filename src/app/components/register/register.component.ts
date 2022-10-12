import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenInfo } from 'src/app/interface/authenInfo';
import { User } from 'src/app/interface/user';
import { SiblingService } from 'src/app/services/sibling.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hide = true;
  loading = false;
  constructor(private fb: FormBuilder, private sibling: SiblingService, private _snackBar: MatSnackBar, private router: Router, private toastr: ToastrService, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  login() {
    const user = <User>{
      username: this.form.value.username,
      full_name: this.form.value.fullname,
      email: this.form.value.email,
    }
    this.userService.register(user).subscribe((res: any) => {
      console.log("res", res);
      if (res.ok) {
        this._snackBar.open(res.message, 'Again', {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.form.reset();
      } else {
        this.error(res.message);
        this.form.reset();
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
