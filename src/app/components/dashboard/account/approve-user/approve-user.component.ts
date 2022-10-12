import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interface/user';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.css']
})
export class ApproveUserComponent implements OnInit {

  constructor(public dialog: MatDialog,private toastr: ToastrService,public dialogRef: MatDialogRef<ApproveUserComponent>, private errToastr: ErrorToastrService, private userService: UserService,@Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }
  complete() {
    this.userService.approveUser(this.data.userId, "approved").subscribe((res: any) => {
      console.log(this.data.userId)
      console.log(res)
      if (res) {
        this.dialogRef.close();
        this.toastr.success('Approved User Succesfull', 'Done');       
      }
    },
      (err: any) => {
        this.dialogRef.close();
        this.errToastr.errToastr(err);
      })
  }

}
