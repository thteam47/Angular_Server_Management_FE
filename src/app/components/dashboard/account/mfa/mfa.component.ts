import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Mfas } from 'src/app/interface/mfas';
import { User } from 'src/app/interface/user';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})
export class MfaComponent implements OnInit {

  selectRole= new FormControl();
  typeMfa:string = "";
  permissions= new FormControl();
  form: FormGroup;
  constructor(private fb: FormBuilder,private toastr: ToastrService,private errToastr: ErrorToastrService,private userService:UserService,public dialogRef: MatDialogRef<MfaComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      publicData: [''],
      enable: [''],
    })
   }


  ngOnInit(): void {
    this.selectRole.setValue(this.data.role)
    //this.action.setValue(this.data.action)
  }
  complete(){
    const dataMfa = <Mfas>{
      type: this.typeMfa,
      publicData: this.form.value.publicData,
      enabled: true,
    }
    var dataSend : Array<Mfas> = [];
    dataSend.push(dataMfa)
    console.log(dataMfa)
    this.userService.updateMfa(dataSend,this.data.userId).subscribe((res: any) => {
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
