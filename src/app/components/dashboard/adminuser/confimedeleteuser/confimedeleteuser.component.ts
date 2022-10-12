import { UserService } from 'src/app/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interface/user';


@Component({
  selector: 'app-confimedeleteuser',
  templateUrl: './confimedeleteuser.component.html',
  styleUrls: ['./confimedeleteuser.component.css']
})
export class ConfimedeleteuserComponent implements OnInit {

  constructor(public dialog: MatDialog,private toastr: ToastrService,public dialogRef: MatDialogRef<ConfimedeleteuserComponent>, private errToastr: ErrorToastrService, private userService: UserService,@Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }
  complete() {
    this.userService.deleteUser(this.data.userId).subscribe((res: any) => {
      console.log(this.data.userId)
      console.log(res)
      if (res) {
        this.dialogRef.close();
        this.toastr.success('Delete User Succesfull', 'Done');       
      }
    },
      (err: any) => {
        this.dialogRef.close();
        this.errToastr.errToastr(err);
      })
  }
}
