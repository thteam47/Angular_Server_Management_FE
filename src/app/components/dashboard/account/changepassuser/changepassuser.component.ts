import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './comfirmed';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { changePas } from 'src/app/interface/pass';
import { User } from 'src/app/interface/user';
@Component({
  selector: 'app-changepassuser',
  templateUrl: './changepassuser.component.html',
  styleUrls: ['./changepassuser.component.css']
})
export class ChangepassuserComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private toastr: ToastrService, private userService: UserService, public dialogRef: MatDialogRef<ChangepassuserComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      repassword: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),]],
    }, {
      validator: ConfirmedValidator('password', 'repassword')
    })
  }
  hide = true;
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  complete(): void {

    const pass = this.form.value.password;
    if (pass == this.data.password) {
      this.toastr.error('Password do not match', 'Failed');
      this.form.reset();
    } else {
      const changePas = <changePas>{
        password: pass
      }
      this.userService.changePassUser(changePas, this.data.idUser).subscribe((res: any) => {
        if (res.mess == "Done") {
          this.toastr.success('Change Password Succesfull', 'Done');
          this.dialogRef.close();
        }
      },
      (err: any) => {
        this.errToastr.errToastr(err);
        this.form.reset();
      })
    }


  }

}
