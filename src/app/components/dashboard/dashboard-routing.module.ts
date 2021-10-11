import { AdminuserComponent } from './adminuser/adminuser.component';
import { AccountComponent } from './account/account.component';
import { NewServerComponent } from './new-server/new-server.component';
import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailstatusComponent } from './detailstatus/detailstatus.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '',component: ContentComponent},
      { path: 'account', component: AccountComponent },
      { path: 'newserver', component: NewServerComponent },
      { path: 'user', component: AdminuserComponent },
      { path: 'detailstatus', component: DetailstatusComponent },
      { path: 'detailstatus/:id', component: DetailstatusComponent },      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
