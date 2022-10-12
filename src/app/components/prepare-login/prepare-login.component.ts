import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenInfo } from 'src/app/interface/authenInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prepare-login',
  templateUrl: './prepare-login.component.html',
  styleUrls: ['./prepare-login.component.css']
})
export class PrepareLoginComponent implements OnInit {

  ngOnInit(): void {
  }
  otp: string | undefined; showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "45px", height: "45px", }, };
  data: any = {};
  message: string = "";
  requestId: string = "";
  routeState: any;
  typeMfa: string = "";
  loading = false;
  constructor(private router: Router, private _snackBar: MatSnackBar, private toastr: ToastrService, private userService: UserService) {
    // if (this.router.getCurrentNavigation()?.extras.state) {
    //   this.routeState = this.router.getCurrentNavigation()?.extras.state;
    //   if (this.routeState) {
    //     console.log(this.routeState)
    //     this.message = this.routeState.message;
    //     this.requestId = this.routeState.requestId;
    //   }
    // }
    this.message = localStorage.getItem("message") || "";
    this.typeMfa = localStorage.getItem("typeMfa") || "";
  }
  setVal(val2:any) {
    this.ngOtpInput.setValue(val2);
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.otp?.length == 6) {
      const authenInfo = <AuthenInfo>{
        type: "AccessToken",
        request_id: localStorage.getItem("requestId") || "",
        otp: Number(this.otp),
        type_mfa: this.typeMfa,
      }
      this.userService.loginAdmin(authenInfo).subscribe((res: any) => {
        console.log("res", res);
        if (res.errorCode === 0) {
          localStorage.setItem('token', res.token)
          this.fakeLoading();
          this.toastr.success('Login Succesfull');
        } else {
          this.error(res.message);
          // this.form.reset();
        }
      },
        (err: any) => {
          this.error(err);
        }
      )
      this.setVal("")
    }
  }
  resendOTP() {
    console.log("ok")
  }
  error(message: string) {
    this._snackBar.open(message, 'Again', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 500);
  }
}
