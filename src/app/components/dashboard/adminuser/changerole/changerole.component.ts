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
@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.component.html',
  styleUrls: ['./changerole.component.css']
})
export class ChangeroleComponent implements OnInit {

  selectRole= new FormControl();
  form: FormGroup;
  constructor(private fb: FormBuilder,private toastr: ToastrService,private errToastr: ErrorToastrService,private userService:UserService,public dialogRef: MatDialogRef<ChangeroleComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      selectRole: new FormControl(),
      action: new FormControl(),
    })
   }


  ngOnInit(): void {
    this.selectRole.setValue(this.data.role)
    this.action.setValue(this.data.action)
  }
  
  listRole: Role[] = [
    { roleName: "Admin", value: "admin" },
    { roleName: "Assistant", value: "assistant" },
    { roleName: "Staff", value: "staff" },
  ]
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
  complete(){
    const dataRole = <changeRole>{
      role: this.selectRole.value,
      action: this.action.value
    }
    this.userService.changeRole(dataRole,this.data.idUser).subscribe((res: any) => {
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
