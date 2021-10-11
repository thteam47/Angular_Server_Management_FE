import { ErrorToastrService } from './../../../services/error-toastr.service';
import { ToastrService } from 'ngx-toastr';
import { Server } from 'src/app/interface/server';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ConfirmedValidator } from '../changepass/comfirmed';

@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.css']
})
export class NewServerComponent implements OnInit {

  form: FormGroup;
  check: boolean = true;

  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private serverService: ServerService, private toastr: ToastrService) {
    this.form = this.fb.group({
      serverName: ['', Validators.required, this.validServername.bind(this)],
      username: ['', Validators.required],
      repassword: ['',  [Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      ip: ['', [Validators.required, Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      description: ['', Validators.required],
    }, { 
      validator: ConfirmedValidator('password', 'repassword')
    })
  }
  get name() { return this.form.get('name'); }

  validation_messages = {
    'serverName': [
      { type: 'required', message: 'Servername is required' },
      { type: 'validServername', message: 'Server Name cannot match' },
    ],
  }
  validServername(fc: FormControl) {
    return new Promise((resolve, reject) => {
      this.serverService.checkServerName(fc.value).subscribe(
        (res: any) => {
          if (res.check == true) {
            resolve({ validServername: true });
          } else {
            resolve(null);
          }
        },
        (err: any) => {
          this.errToastr.errToastr(err);
        })
    }
    )
  }
  ngOnInit(): void {
  }
  hide = true;

  addNew() {
    const data = <Server>{
      idServer: "",
      serverName: this.form.value.serverName,
      ip: this.form.value.ip,
      username: this.form.value.username,
      password: this.form.value.password,
      description: this.form.value.description,
      status: "",
    }
    this.serverService.createServer(data).subscribe((res: any) => {
      this.toastr.success('Add Server Succesfull', 'Done')
      this.form.reset();
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      })

  }
}
