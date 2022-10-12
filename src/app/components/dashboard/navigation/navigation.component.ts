import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MenuService } from './../../../services/menu.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Menu } from 'src/app/interface/menu';
import { SiblingService } from 'src/app/services/sibling.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css', './navigation.component.scss']
})
export class NavigationComponent {

  menu: Menu[] = [];
  show = true;
  role = ""
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.listMenu();
    let roleD = localStorage.getItem('role')
    if (roleD != null){
      this.role = roleD
    }
    // if (this.role != "admin") {
    //   this.menu[2].show = false;
    // }
  }
  constructor(private toastr: ToastrService,public dialog: MatDialog, private sibling: SiblingService, private errToastr: ErrorToastrService, private user: UserService, private breakpointObserver: BreakpointObserver, private _menuServices: MenuService, private sibServices: SiblingService, private router: Router) { }
  ngAfterViewInit(){
    if (this.role != "admin") {
      // this.menu[2].show = false;
    }
  }
  accounts(){
    const dialogRef = this.dialog.open(AccountComponent, {
      width: '700px',
      height: '550px',
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
  listMenu() {
    this._menuServices.getMenu().subscribe(data => {
      this.menu = data;
      // if (this.role != "admin") {
      //   this.menu[2].show = false;
      // }
    },
    )
  }
  logout() {
    this.user.logoutUser().subscribe((res: any) => {
      if (res.mess == "Done") {
        this.toastr.success('Logout Successful', 'Done');
      }
    }),
      (err: any) => {
        this.errToastr.errToastr(err);
      }
  }


}
