import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationComponent } from './navigation/navigation.component';
import { InfoserverComponent } from './infoserver/infoserver.component';
import { NewServerComponent } from './new-server/new-server.component';
import { DetailstatusComponent } from './detailstatus/detailstatus.component';
import { ChartstatusComponent } from './chartstatus/chartstatus.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { ComfimeDeleteComponent } from './comfime-delete/comfime-delete.component';
import { AccountComponent } from './account/account.component';
import { ChangepassuserComponent } from './account/changepassuser/changepassuser.component';
import { ChangeinfouserComponent } from './account/changeinfouser/changeinfouser.component';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { RoleComponent } from './account/role/role.component';
import { ConfimedeleteuserComponent } from './adminuser/confimedeleteuser/confimedeleteuser.component';
import { AdduserComponent } from './adminuser/adduser/adduser.component';
import { ChangeroleComponent } from './adminuser/changerole/changerole.component';
import { SshterminalComponent } from './content/sshterminal/sshterminal.component';
import { ApproveUserComponent } from './account/approve-user/approve-user.component';
import { MfaComponent } from './account/mfa/mfa.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    ContentComponent,
    NavigationComponent,
    InfoserverComponent,
    NewServerComponent,
    DetailstatusComponent,
    ChartstatusComponent,
    ChangepassComponent,
    ComfimeDeleteComponent,
    AccountComponent,
    ChangepassuserComponent,
    ChangeinfouserComponent,
    AdminuserComponent,
    RoleComponent,
    ConfimedeleteuserComponent,
    AdduserComponent,
    ChangeroleComponent,
    SshterminalComponent,
    ApproveUserComponent,
    MfaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class DashboardModule { }
