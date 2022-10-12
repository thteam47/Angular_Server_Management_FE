import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from './comfirmed';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-forgot-password',
  templateUrl: './update-forgot-password.component.html',
  styleUrls: ['./update-forgot-password.component.css']
})
export class UpdateForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService, private _snackBar: MatSnackBar, private router: Router, private userService: UserService) { 
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      repassword: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),]],
    }, {
      validator: ConfirmedValidator('password', 'repassword')
    })
  }
  form: FormGroup;
  hide = true;
  loading = false; 
  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') || "";
    console.log(token)
    this.userService.verifyToken(token).subscribe((res: any) => {
      console.log("res", res);
      if (!res.ok) {
        this.toastr.error('Fobiiden');
        this.router.navigate(['login']);
      }
    },
      (err: any) => {
        this.toastr.error('Fobiiden');
        this.router.navigate(['login']);
      }
    )
  }
  doSubmit() {
    const token = this.route.snapshot.paramMap.get('token') || "";
    console.log(token)
    this.userService.updatePassword(this.form.value.password, token).subscribe((res: any) => {
      console.log("res", res);
      if (res.ok) {
        this._snackBar.open(res.message, 'Again', {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['login']);
      }
    },
      (err: any) => {
        this.toastr.error('Fobiiden');
        this.router.navigate(['login']);
      }
    )
  }

}
