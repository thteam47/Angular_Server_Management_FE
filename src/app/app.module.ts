import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from 'ng-otp-input';
import {MatRadioModule} from '@angular/material/radio';

//api

//components
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SiblingService } from './services/sibling.service';
import { CookieService } from 'ngx-cookie-service';
import { PrepareLoginComponent } from './components/prepare-login/prepare-login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdateForgotPasswordComponent } from './components/update-forgot-password/update-forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardsComponent,
    PrepareLoginComponent,
    RegisterComponent,
    VerifyAccountComponent,
    ForgotPasswordComponent,
    UpdateForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    NgOtpInputModule,
    MatRadioModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true
    }
    ),
  ],
  providers: [SiblingService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
