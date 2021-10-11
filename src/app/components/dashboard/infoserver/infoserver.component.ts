import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Server } from 'src/app/interface/server';
import { ServerService } from 'src/app/services/server.service';
import { detailsServer } from 'src/app/interface/detailsServer';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';

@Component({
  selector: 'app-infoserver',
  templateUrl: './infoserver.component.html',
  styleUrls: ['./infoserver.component.css']
})
export class InfoserverComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private serverService: ServerService, private toastr: ToastrService, public dialogRef: MatDialogRef<InfoserverComponent>, @Inject(MAT_DIALOG_DATA) public data: Server) {
    this.form = this.fb.group({
      serverName: ['', Validators.required],
      username: ['', Validators.required],
      ip: ['', [Validators.required, Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      description: ['', Validators.required],
    })
  }
  hide = true;
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  complete(): void {

    const dataSer = <Server>{
      idServer: "",
      serverName: this.form.value.serverName,
      ip: this.form.value.ip,
      username: this.form.value.username,
      password: "",
      description: this.form.value.description,
      status: "",
    }
    const infoSer = <detailsServer>{
      infoServer: dataSer
    }
    this.serverService.editServer(infoSer, this.data.idServer).subscribe((res: any) => {
      this.toastr.success('Edit Server Succesfull', 'Done');
      this.dialogRef.close();
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      })
  }
}


