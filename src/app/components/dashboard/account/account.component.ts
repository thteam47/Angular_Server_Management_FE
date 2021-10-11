import { ChangeinfouserComponent } from './changeinfouser/changeinfouser.component';
import { ChangepassuserComponent } from './changepassuser/changepassuser.component';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RoleComponent } from './role/role.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User = <User>{};
  constructor(public dialog: MatDialog,private userService: UserService, public dialogRef: MatDialogRef<AccountComponent>, private toastr: ToastrService, private errToastr: ErrorToastrService) { }

  ngOnInit(): void {
    this.getInfo();
  }
  closeDiaLog(){
    this.dialogRef.close();
  }
  getInfo() {
    this.userService.getUser().subscribe((res: any) => {
      this.user = <User>{
        idUser: res.idUser,
        fullName: res.fullName,
        username:res.username,
        email: res.email,
        role: res.role,
        password: res.password,
        action: res.action,
      }
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }
  changePass(){
    const dialogRef = this.dialog.open(ChangepassuserComponent, {
      width: '500px',
      data: { idUser: "null", password:this.user.password }
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
  editUser(){
    const dialogRef = this.dialog.open(ChangeinfouserComponent, {
      width: '500px',
      data: { idUser: "null", fullName:this.user.fullName,username:this.user.username,email:this.user.email }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getInfo();
    });
  }
  viewRole(){
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '300px',
      data: { action:this.user.action }
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }


}
