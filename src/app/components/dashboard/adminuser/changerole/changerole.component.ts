import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interface/user';
import { Action } from './../../../../interface/action';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { Role } from 'src/app/interface/role';
import { changeRole } from 'src/app/interface/changeRole';
import { Permission } from 'src/app/interface/permissions';

@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.component.html',
  styleUrls: ['./changerole.component.css']
})
export class ChangeroleComponent implements OnInit {

  selectRole= new FormControl();
  permission_all:boolean = false;
  permissionAll:string = "";
  permissions= new FormControl();
  form: FormGroup;
  constructor(private fb: FormBuilder,private toastr: ToastrService,private errToastr: ErrorToastrService,private userService:UserService,public dialogRef: MatDialogRef<ChangeroleComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      selectRole: new FormControl(),
      permissions: new FormControl(),
    })
   }


  ngOnInit(): void {
    this.selectRole.setValue(this.data.role)
    //this.action.setValue(this.data.action)
  }
  
  listRole: Role[] = [
    { roleName: "Admin", value: "admin" },
    { roleName: "Assistant", value: "assistant" },
    { roleName: "Staff", value: "staff" },
    { roleName: "Member", value: "member" },
  ]
  action = new FormControl();
  listAction: Action[] = [
    { actionName: "Idnetity Api", value: "identity-api" },
    { actionName: "Idnetity Authen Api", value: "identity-authen-api" },
    { actionName: "Survey-api", value: "survey-api" },
  ]
  complete(){
    var permissionss: Array<Permission> = [];
    if (this.permissions.value) {
      for(var i = 0; i < this.permissions.value.length; i++) {
        console.log(this.permissions.value[i])
        permissionss.push(<Permission>{
          privilege: this.permissions.value[i]
        })
      }
    }
    console.log(this.permissionAll)
    if (this.permissionAll === "1") {
      this.permission_all= true
    }
    const dataRole = <changeRole>{
      role: this.selectRole.value,
      permissionAll: this.permission_all,
      permissions: permissionss,
    }
    console.log(dataRole)
    this.userService.changeRole(dataRole,this.data.userId).subscribe((res: any) => {
      this.toastr.success('Change Role User Succesfull', 'Done');
      this.dialogRef.close();
    }, (err: any) => {
      this.dialogRef.close();
      this.errToastr.errToastr(err);
    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
