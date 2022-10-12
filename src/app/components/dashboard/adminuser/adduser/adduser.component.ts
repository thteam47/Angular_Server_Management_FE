import { Action } from './../../../../interface/action';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { User } from 'src/app/interface/user';
import { ConfirmedValidator } from './comfirmed';
import { Role } from 'src/app/interface/role';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  selectRole = new FormControl('', Validators.required);
  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private userService: UserService, private toastr: ToastrService, public dialogRef: MatDialogRef<AdduserComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      repassword: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),]],
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      selectRole: new FormControl(),
      action: new FormControl(),
    }, {
      validator: ConfirmedValidator('password', 'repassword')
    })
  }
  listRole: Role[] = [
    { roleName: "Admin", value: "admin" },
    { roleName: "Assistant", value: "assistant" },
    { roleName: "Staff", value: "staff" },
  ]
  hide = true;
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  complete(): void {
    const dataUser = <User>{
      // idUser: "",
      // fullName: this.form.value.fullName,
      // email: this.form.value.email,
      // username: this.form.value.username,
      // password: this.form.value.password,
      // role: this.selectRole.value,
      // action: this.action.value,
    }
    this.userService.addUser(dataUser).subscribe((res: any) => {
      this.toastr.success('Add User Succesfull', 'Done');
      this.dialogRef.close();
    }, (err: any) => {
      this.errToastr.errToastr(err);
      this.form.reset();
    })

  }
  action = new FormControl();
  listAction: Action[] = [
    { actionName: "Add Server", value: "Add Server" },
    { actionName: "Update Server", value: "Update Server" },
    { actionName: "Detail Status", value: "Detail Status" },
    { actionName: "Export", value: "Export" },
    { actionName: "Connect", value: "Connect" },
    { actionName: "Disconnect", value: "Disconnect" },
    { actionName: "Delete Server", value: "Delete Server" },
    { actionName: "Change Password", value: "Change Password" },
  ]

}

