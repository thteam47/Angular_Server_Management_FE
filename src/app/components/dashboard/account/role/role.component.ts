import { User } from 'src/app/interface/user';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RoleComponent>, @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
