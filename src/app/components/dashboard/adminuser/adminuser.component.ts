import { ChangeroleComponent } from './changerole/changerole.component';
import { ChangepassuserComponent } from './../account/changepassuser/changepassuser.component';
import { RoleComponent } from './../account/role/role.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeinfouserComponent } from '../account/changeinfouser/changeinfouser.component';
import { ApproveUserComponent } from '../account/approve-user/approve-user.component';
import { ConfimedeleteuserComponent } from './confimedeleteuser/confimedeleteuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { MfaComponent } from '../account/mfa/mfa.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
  datas: User[] = [];
  displayedColumns: string[] = ["userId", "fullName", "email", "username", "role", "status", "action"];
  dataSource = new MatTableDataSource<User>(this.datas);
  constructor(private userService:UserService,private errToastr: ErrorToastrService,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  @ViewChild(MatSort) sort!: MatSort;
  getAllUser(){
    this.datas = [];
    this.userService.getAllUser().subscribe((res: any) => {
      console.log(res)
      for (var key in res.data) {
        this.datas.push(res.data[key])
      }
      this.dataSource = new MatTableDataSource<User>(this.datas);
      this.dataSource.sort = this.sort;
    },
      (err: any) => {
        this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err);
      }
    )
  }
  viewRole(element:any){
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '300px',
      data: { permission_all:element.permissionAll, permissions: element.permissions, role: element.role}
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
  editUser(element:any){
    const dialogRef = this.dialog.open(ChangeinfouserComponent, {
      width: '500px',
      data: { userId: element.userId, fullName:element.fullName,username:element.username,email:element.email }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }
  changePass(element:any){
    const dialogRef = this.dialog.open(ChangepassuserComponent, {
      width: '500px',
      data: { userId: element.userId, password:element.password }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }
  deleteUser(element:any){
    const dialogRef = this.dialog.open(ConfimedeleteuserComponent, {
      width: '400px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }
  approveUser(element:any){
    const dialogRef = this.dialog.open(ApproveUserComponent, {
      width: '400px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }
  addUser(){
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }
  changeRole(element:any){
    const dialogRef = this.dialog.open(ChangeroleComponent, {
      width: '500px',
      data: { userId: element.userId, role:element.role, action:element.action }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }
  changeMfa(element:any){
    const dialogRef = this.dialog.open(MfaComponent, {
      width: '500px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }

}
