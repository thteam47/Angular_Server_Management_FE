import { changePas } from './../../../interface/pass';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Server } from 'src/app/interface/server';
import { ConfirmedValidator } from './comfirmed';
import { ServerService } from 'src/app/services/server.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private toastr: ToastrService, private serverService: ServerService, public dialogRef: MatDialogRef<ChangepassComponent>, @Inject(MAT_DIALOG_DATA) public data: Server) {
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
    const changePas = <changePas>{
      password: pass
    }
    this.serverService.changePass(changePas, this.data.idServer).subscribe((res: any) => {
      if (res.mess == "Done") {
        this.toastr.success('Change Password Succesfull', 'Done');
        this.dialogRef.close();
      }
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      })
  }
}
