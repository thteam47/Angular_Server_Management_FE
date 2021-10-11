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
import { ConfimedeleteuserComponent } from './confimedeleteuser/confimedeleteuser.component';
import { AdduserComponent } from './adduser/adduser.component';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
  datas: User[] = [];
  displayedColumns: string[] = ["idUser", "fullName", "email", "username", "role", "action"];
  dataSource = new MatTableDataSource<User>(this.datas);
  constructor(private userService:UserService,private errToastr: ErrorToastrService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  @ViewChild(MatSort) sort!: MatSort;
  getAllUser(){
    this.datas = [];
    this.userService.getAllUser().subscribe((res: any) => {
      for (var key in res.data) {
        this.datas.push(res.data[key])
      }
      this.dataSource = new MatTableDataSource<User>(this.datas);
      this.dataSource.sort = this.sort;
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }
  viewRole(element:any){
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '300px',
      data: { action:element.action }
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
  editUser(element:any){
    const dialogRef = this.dialog.open(ChangeinfouserComponent, {
      width: '500px',
      data: { idUser: element.idUser, fullName:element.fullName,username:element.username,email:element.email }
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
      data: { idUser: element.idUser, password:element.password }
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
      data: { idUser: element.idUser }
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
      data: { idUser: element.idUser, role:element.role, action:element.action }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(()=>{
        this.getAllUser();
      },1000)
    });
  }

}
