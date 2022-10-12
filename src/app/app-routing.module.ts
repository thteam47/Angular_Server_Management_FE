import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrepareLoginComponent } from './components/prepare-login/prepare-login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdateForgotPasswordComponent } from './components/update-forgot-password/update-forgot-password.component';

const routes: Routes = [

  { path: '', redirectTo: 'login',pathMatch: 'full' },
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'verify-account/:token',component: VerifyAccountComponent },
  { path: 'forgot-password',component: ForgotPasswordComponent },
  { path: 'update-password/:token',component: UpdateForgotPasswordComponent },
  { path: 'prepare-login',component: PrepareLoginComponent },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule) },
  { path: '**', redirectTo: 'login',pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
