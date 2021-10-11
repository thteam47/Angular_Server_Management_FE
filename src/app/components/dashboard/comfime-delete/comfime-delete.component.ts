import { Server } from 'src/app/interface/server';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServerService } from 'src/app/services/server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';

@Component({
  selector: 'app-comfime-delete',
  templateUrl: './comfime-delete.component.html',
  styleUrls: ['./comfime-delete.component.css']
})
export class ComfimeDeleteComponent implements OnInit {

  constructor(private toastr: ToastrService, private errToastr: ErrorToastrService, private serverService: ServerService, public dialogRef: MatDialogRef<ComfimeDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Server) { }

  ngOnInit(): void {
  }
  complete() {
    this.serverService.deleteSer(this.data.idServer).subscribe((res: any) => {
      if (res.ok == true) {
        this.toastr.success('Delete Server Succesfull', 'Done');
        this.dialogRef.close();
      }
      
    },
      (err: any) => {
        this.dialogRef.close();
        this.errToastr.errToastr(err);
      })
  }

}
