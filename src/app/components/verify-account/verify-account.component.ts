import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private _snackBar: MatSnackBar, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') || "";
    console.log(token)
    this.userService.verifyUser(token).subscribe((res: any) => {
      this._snackBar.open(res.message, 'Again', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      if (res.ok) {
        this.router.navigate(['update-password', token]);
      } else {
        // this.router.navigate(['login']);
      }
    },
      (err: any) => {
        this.toastr.error('Fobiiden');
        // this.router.navigate(['login']);
      }
    )
  }
}
