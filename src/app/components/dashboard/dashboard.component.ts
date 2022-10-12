import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SiblingService } from 'src/app/services/sibling.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor( private router: Router,private sibling:SiblingService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (token == null) {
      // this.router.navigate(['/login']);
    }
  }

}
